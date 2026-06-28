import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@shared/database/prisma/prisma.service';
import { ReportBrowserService } from './report-browser.service';
import { ReportMediaService } from './report-media.service';
import { ReportTemplateService } from './report-template.service';
import {
  FieldOptionI,
  GeneratedReportI,
  ReportFieldI,
  ReportImageI,
  ReportSectionI,
  UploadedMediaI,
  VehicleReportI,
} from './report.types';

const EVALUATION_TYPE = 'EVALUATION';

@Injectable()
export class ReportService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly browserService: ReportBrowserService,
    private readonly mediaService: ReportMediaService,
    private readonly templateService: ReportTemplateService,
  ) {}

  async generateVehicleReportPdf(vehicleId: string): Promise<GeneratedReportI> {
    const report = await this.buildVehicleReport(vehicleId);
    const html = this.templateService.render(report);
    const browser = await this.browserService.getBrowser();
    const page = await browser.newPage();

    try {
      await page.setViewport({
        width: 1240,
        height: 1754,
        deviceScaleFactor: 1,
      });
      await page.setContent(html, { waitUntil: 'load', timeout: 60000 });
      await page.emulateMediaType('print');

      const pdf = await page.pdf({
        format: 'A4',
        printBackground: true,
        displayHeaderFooter: true,
        headerTemplate: this.templateService.renderHeaderTemplate(report),
        footerTemplate: this.templateService.renderFooterTemplate(),
        margin: {
          top: '42px',
          right: '0px',
          bottom: '46px',
          left: '0px',
        },
      });

      return {
        buffer: Buffer.from(pdf),
        fileName: this.createFileName(report),
      };
    } finally {
      await page.close();
    }
  }

  private async buildVehicleReport(vehicleId: string): Promise<VehicleReportI> {
    const vehicle = await this.prisma.vehicle.findFirst({
      where: { id: vehicleId, deletedAt: null },
      include: {
        creator: { select: { name: true, email: true } },
        modifier: { select: { name: true, email: true } },
      },
    });

    if (!vehicle) {
      throw new NotFoundException('Vehicle not found');
    }

    const steps = await this.getEvaluationSteps();
    const stepIds = steps.map((step) => step.id);

    const [documents, fields] = await Promise.all([
      this.prisma.vehicleDocument.findMany({
        where: {
          vehicleId,
          documentGroupId: { in: stepIds },
        },
        orderBy: { updatedAt: 'asc' },
      }),
      this.prisma.formField.findMany({
        where: {
          documentGroupId: { in: stepIds },
          isEnabled: true,
          deletedAt: null,
        },
        orderBy: { order: 'asc' },
      }),
    ]);

    const specsByGroup = new Map<string, Record<string, unknown>>();

    for (const document of documents) {
      const current = specsByGroup.get(document.documentGroupId) || {};
      specsByGroup.set(document.documentGroupId, {
        ...current,
        ...this.toObject(document.documentSpec),
      });
    }

    const fieldsByGroup = new Map<string, typeof fields>();

    for (const field of fields) {
      const current = fieldsByGroup.get(field.documentGroupId) || [];
      current.push(field);
      fieldsByGroup.set(field.documentGroupId, current);
    }

    const sections = steps.map((step) =>
      this.buildSection(
        {
          id: step.id,
          name: step.name,
          description: step.description,
          order: step.order,
        },
        specsByGroup.get(step.id) || {},
        fieldsByGroup.get(step.id) || [],
      ),
    );

    const imageItems = sections.flatMap((section) =>
      section.images
        .filter((image) => !image.dataUrl)
        .map((image) =>
          this.toUploadedMedia(
            (image as ReportImageI & { media?: UploadedMediaI }).media,
          ),
        )
        .filter((image): image is UploadedMediaI => Boolean(image)),
    );
    const imageDataUrls =
      await this.mediaService.createPdfImageDataUrls(imageItems);
    const hydratedSections = sections.map((section) => ({
      ...section,
      images: section.images.map((image) => {
        const media = this.toUploadedMedia(
          (image as ReportImageI & { media?: UploadedMediaI }).media,
        );

        return {
          ...image,
          dataUrl: media ? imageDataUrls[media.path] : image.dataUrl,
          fallbackText: media
            ? 'Image could not be rendered in the PDF'
            : image.fallbackText,
          media: undefined,
        };
      }),
    }));

    const includedFields = hydratedSections.reduce(
      (count, section) => count + section.fields.length,
      0,
    );
    const includedImages = hydratedSections.reduce(
      (count, section) => count + section.images.length,
      0,
    );

    return {
      vehicle: {
        id: vehicle.id,
        name: vehicle.name,
        vehicleNumber: vehicle.vehicleNumber,
        model: vehicle.model,
        status: vehicle.status,
        createdAt: vehicle.createdAt,
        updatedAt: vehicle.updatedAt,
        evaluator:
          vehicle.creator?.name ||
          vehicle.creator?.email ||
          vehicle.createdBy ||
          'Not assigned',
      },
      generatedAt: new Date(),
      metrics: [
        { label: 'Vehicle Number', value: vehicle.vehicleNumber },
        { label: 'Status', value: this.formatStatus(vehicle.status) },
        { label: 'Included Fields', value: String(includedFields) },
        { label: 'Inspection Images', value: String(includedImages) },
        { label: 'Created On', value: this.formatDate(vehicle.createdAt) },
        { label: 'Updated On', value: this.formatDate(vehicle.updatedAt) },
      ],
      sections: hydratedSections,
    };
  }

  private async getEvaluationSteps() {
    const evaluationGroup = await this.prisma.documentGroup.findFirst({
      where: {
        identifier: EVALUATION_TYPE,
        parentId: null,
        isEnabled: true,
      },
    });

    if (evaluationGroup) {
      const steps = await this.prisma.documentGroup.findMany({
        where: {
          parentId: evaluationGroup.id,
          isEnabled: true,
        },
        orderBy: { order: 'asc' },
      });

      if (steps.length > 0) {
        return steps;
      }
    }

    return this.prisma.documentGroup.findMany({
      where: {
        type: 'FORM_STEP',
        isEnabled: true,
      },
      orderBy: { order: 'asc' },
    });
  }

  private buildSection(
    step: {
      id: string;
      name: string;
      description: string | null;
      order: number | null;
    },
    spec: Record<string, unknown>,
    fields: Array<{
      label: string;
      fieldKey: string;
      type: string;
      options: unknown;
      order: number;
    }>,
  ): ReportSectionI {
    const consumedKeys = new Set<string>();
    const reportFields: ReportFieldI[] = [];
    const images: Array<ReportImageI & { media?: UploadedMediaI }> = [];

    for (const field of fields.sort(
      (left, right) => left.order - right.order,
    )) {
      const value = spec[field.fieldKey];
      consumedKeys.add(field.fieldKey);

      if (this.isEmptyValue(value)) {
        continue;
      }

      const media = this.toUploadedMedia(value);

      if (field.type === 'file' && media) {
        if (media.type === 'image') {
          images.push({
            label: field.label,
            fieldKey: field.fieldKey,
            originalName: media.originalName || media.path,
            media,
          });
        } else {
          reportFields.push({
            label: field.label,
            fieldKey: field.fieldKey,
            type: field.type,
            value: `${this.formatStatus(media.type || 'file')} - ${media.originalName || media.path}`,
          });
        }

        continue;
      }

      const formattedValue = this.formatFieldValue(
        value,
        this.toOptions(field.options),
      );

      if (!formattedValue) {
        continue;
      }

      reportFields.push({
        label: field.label,
        fieldKey: field.fieldKey,
        type: field.type,
        value: formattedValue,
      });
    }

    for (const [key, value] of Object.entries(spec)) {
      if (consumedKeys.has(key) || this.isEmptyValue(value)) {
        continue;
      }

      const media = this.toUploadedMedia(value);

      if (media?.type === 'image') {
        images.push({
          label: this.humanizeKey(key),
          fieldKey: key,
          originalName: media.originalName || media.path,
          media,
        });
        continue;
      }

      const formattedValue = media
        ? `${this.formatStatus(media.type || 'file')} - ${media.originalName || media.path}`
        : this.formatFieldValue(value, []);

      if (!formattedValue) {
        continue;
      }

      reportFields.push({
        label: this.humanizeKey(key),
        fieldKey: key,
        type: 'unknown',
        value: formattedValue,
      });
    }

    return {
      id: step.id,
      name: step.name,
      description: step.description,
      order: step.order,
      fields: reportFields,
      images,
    };
  }

  private formatFieldValue(value: unknown, options: FieldOptionI[]): string {
    if (this.isEmptyValue(value)) {
      return '';
    }

    if (Array.isArray(value)) {
      return value
        .map((item) => this.formatFieldValue(item, options))
        .filter(Boolean)
        .join(', ');
    }

    if (typeof value === 'boolean') {
      return value ? 'Yes' : 'No';
    }

    if (typeof value === 'number') {
      return String(value);
    }

    if (typeof value === 'string') {
      return this.getOptionLabel(value, options) || value;
    }

    if (value && typeof value === 'object') {
      const objectValue = value as Record<string, unknown>;
      const label =
        (objectValue.label as string) ||
        (objectValue.name as string) ||
        (objectValue.displayName as string);
      const rawValue =
        (objectValue.value as string | number | boolean) ??
        (objectValue.id as string);

      if (label !== undefined && label !== null && String(label).trim()) {
        return String(label);
      }

      if (
        rawValue !== undefined &&
        rawValue !== null &&
        String(rawValue).trim()
      ) {
        return (
          this.getOptionLabel(String(rawValue), options) || String(rawValue)
        );
      }

      return JSON.stringify(value);
    }

    return String(value);
  }

  private getOptionLabel(value: string, options: FieldOptionI[]) {
    const option = options.find((item) => String(item.value) === value);
    return option?.label ? String(option.label) : '';
  }

  private toOptions(value: unknown): FieldOptionI[] {
    if (!Array.isArray(value)) {
      return [];
    }

    return value.filter((item): item is FieldOptionI =>
      Boolean(item && typeof item === 'object'),
    );
  }

  private toUploadedMedia(value: unknown): UploadedMediaI | undefined {
    if (!value || typeof value !== 'object') {
      return undefined;
    }

    const item = value as UploadedMediaI;

    if (!item.bucket || !item.path) {
      return undefined;
    }

    return item;
  }

  private isEmptyValue(value: unknown) {
    if (value === null || value === undefined) {
      return true;
    }

    if (typeof value === 'string') {
      return value.trim() === '';
    }

    if (Array.isArray(value)) {
      return (
        value.length === 0 || value.every((item) => this.isEmptyValue(item))
      );
    }

    return false;
  }

  private toObject(value: unknown): Record<string, unknown> {
    if (!value || typeof value !== 'object' || Array.isArray(value)) {
      return {};
    }

    return value as Record<string, unknown>;
  }

  private createFileName(report: VehicleReportI) {
    const vehicleNumber = report.vehicle.vehicleNumber || report.vehicle.id;
    const safeVehicleNumber = vehicleNumber
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

    return `vehicle-report-${safeVehicleNumber || report.vehicle.id}.pdf`;
  }

  private humanizeKey(key: string) {
    return key
      .split(/[_\s-]+/)
      .filter(Boolean)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  private formatStatus(status: string) {
    return this.humanizeKey(status);
  }

  private formatDate(date: Date) {
    return new Intl.DateTimeFormat('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(date);
  }
}
