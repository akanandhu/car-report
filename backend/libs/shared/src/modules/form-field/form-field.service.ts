import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { FormFieldRepository } from './repository/form-field.repository';
import { PrismaService } from '@shared/database/prisma/prisma.service';
import { DocumentGroupRepository } from '../document-group/repository/document-group.repository';
import { FIELD_TYPES } from './interface/form-field.interface';

@Injectable()
export class SharedFormFieldService {
  private readonly formFieldRepository: FormFieldRepository;
  private readonly documentGroupRepository: DocumentGroupRepository;

  constructor(
    private readonly prisma: PrismaService,
  ) {
    this.formFieldRepository = new FormFieldRepository(prisma);
    this.documentGroupRepository = new DocumentGroupRepository(prisma);
  }

  /**
   * Get form configuration for a specific type and step number.
   * Returns all enabled fields for the given type and step, ordered by `order`.
   */
  async getFormConfig(type: string, step: number) {
    // Find the parent document group (the type)
    const typeGroup = await this.documentGroupRepository.findOne({
      where: { identifier: type.toUpperCase(), parentId: null },
    });

    if (!typeGroup) {
      throw new NotFoundException(`Form type '${type}' not found`);
    }

    // Get all steps for this type to determine total steps
    const allSteps = await this.documentGroupRepository.findMany({
      where: { parentId: typeGroup.id, isEnabled: true },
      orderBy: { order: 'asc' },
    });

    if (allSteps.length === 0) {
      throw new NotFoundException(`No steps found for form type '${type}'`);
    }

    // Find the specific step by order number
    const stepGroup = allSteps.find((s) => s.order === step);

    if (!stepGroup) {
      throw new NotFoundException(`Step ${step} not found for form type '${type}'`);
    }

    // Get all enabled fields for this step, ordered
    const fields = await this.formFieldRepository.findMany({
      where: {
        documentGroupId: stepGroup.id,
        isEnabled: true,
        deletedAt: null,
      },
      orderBy: { order: 'asc' },
    });

    return {
      type: type.toUpperCase(),
      step,
      stepId: stepGroup.id,
      stepName: stepGroup.name,
      stepDescription: stepGroup.description,
      totalSteps: allSteps.length,
      fields: fields.map((field) => ({
        id: field.id,
        type: field.type,
        label: field.label,
        fieldKey: field.fieldKey,
        placeholder: field.placeholder,
        defaultValue: field.defaultValue,
        isRequired: field.isRequired,
        order: field.order,
        validation: field.validation,
        options: field.options,
        endpoint: field.endpoint,
        conditions: field.conditions,
      })),
    };
  }

  /**
   * Get all steps overview for a type (without field details).
   */
  async getTypeSteps(type: string) {
    const typeGroup = await this.documentGroupRepository.findOne({
      where: { identifier: type.toUpperCase(), parentId: null },
    });

    if (!typeGroup) {
      throw new NotFoundException(`Form type '${type}' not found`);
    }

    const steps = await this.documentGroupRepository.findMany({
      where: { parentId: typeGroup.id, isEnabled: true },
      orderBy: { order: 'asc' },
    });

    return {
      type: type.toUpperCase(),
      typeName: typeGroup.name,
      typeDescription: typeGroup.description,
      totalSteps: steps.length,
      steps: steps.map((s) => ({
        stepId: s.id,
        stepNumber: s.order,
        stepName: s.name,
        stepDescription: s.description,
      })),
    };
  }

  /**
   * Add a new field to a specific step (document group).
   */
  async addField(data: {
    documentGroupId: string;
    type: string;
    label: string;
    fieldKey: string;
    placeholder?: string;
    defaultValue?: string;
    isRequired?: boolean;
    order?: number;
    validation?: any;
    options?: any;
    endpoint?: string;
    conditions?: any;
    isEnabled?: boolean;
  }) {
    // Validate field type
    if (!FIELD_TYPES.includes(data.type as any)) {
      throw new BadRequestException(
        `Invalid field type '${data.type}'. Allowed types: ${FIELD_TYPES.join(', ')}`,
      );
    }

    // Check document group exists
    const documentGroup = await this.documentGroupRepository.findById(data.documentGroupId);
    if (!documentGroup) {
      throw new NotFoundException('Document group (step) not found');
    }

    // Check for duplicate fieldKey within same document group
    const existingField = await this.formFieldRepository.findOne({
      where: {
        documentGroupId: data.documentGroupId,
        fieldKey: data.fieldKey,
      },
    });

    if (existingField) {
      throw new ConflictException(
        `Field with key '${data.fieldKey}' already exists in this step`,
      );
    }

    // If no order specified, put it at the end
    if (data.order === undefined) {
      const maxOrderField = await this.formFieldRepository.findMany({
        where: { documentGroupId: data.documentGroupId },
        orderBy: { order: 'desc' },
        take: 1,
      });
      data.order = maxOrderField.length > 0 ? maxOrderField[0].order + 1 : 1;
    }

    const field = await this.formFieldRepository.create({
      documentGroupId: data.documentGroupId,
      type: data.type,
      label: data.label,
      fieldKey: data.fieldKey,
      placeholder: data.placeholder || null,
      defaultValue: data.defaultValue || null,
      isRequired: data.isRequired ?? false,
      order: data.order,
      validation: data.validation || null,
      options: data.options || null,
      endpoint: data.endpoint || null,
      conditions: data.conditions || null,
      isEnabled: data.isEnabled ?? true,
    });

    return field;
  }

  /**
   * Update a field's properties.
   */
  async updateField(
    fieldId: string,
    data: {
      type?: string;
      label?: string;
      fieldKey?: string;
      placeholder?: string;
      defaultValue?: string;
      isRequired?: boolean;
      order?: number;
      validation?: any;
      options?: any;
      endpoint?: string;
      conditions?: any;
      isEnabled?: boolean;
    },
  ) {
    const field = await this.formFieldRepository.findById(fieldId);
    if (!field) {
      throw new NotFoundException('Form field not found');
    }

    // Validate type if being updated
    if (data.type && !FIELD_TYPES.includes(data.type as any)) {
      throw new BadRequestException(
        `Invalid field type '${data.type}'. Allowed types: ${FIELD_TYPES.join(', ')}`,
      );
    }

    // If fieldKey is being updated, check for duplicates
    if (data.fieldKey && data.fieldKey !== field.fieldKey) {
      const existingField = await this.formFieldRepository.findOne({
        where: {
          documentGroupId: field.documentGroupId,
          fieldKey: data.fieldKey,
        },
      });

      if (existingField) {
        throw new ConflictException(
          `Field with key '${data.fieldKey}' already exists in this step`,
        );
      }
    }

    return this.formFieldRepository.updateById(fieldId, data);
  }

  /**
   * Soft delete a field.
   */
  async removeField(fieldId: string) {
    const field = await this.formFieldRepository.findById(fieldId);
    if (!field) {
      throw new NotFoundException('Form field not found');
    }

    await this.formFieldRepository.softDeleteById(fieldId);
    return { message: 'Field removed successfully' };
  }

  /**
   * Reorder fields within a step.
   * Accepts an array of { fieldId, order } objects.
   */
  async reorderFields(
    documentGroupId: string,
    fieldOrders: { fieldId: string; order: number }[],
  ) {
    // Verify document group exists
    const documentGroup = await this.documentGroupRepository.findById(documentGroupId);
    if (!documentGroup) {
      throw new NotFoundException('Document group (step) not found');
    }

    // Update each field's order within a transaction
    const updates = fieldOrders.map((item) =>
      this.formFieldRepository.updateById(item.fieldId, { order: item.order }),
    );

    await Promise.all(updates);

    // Return the reordered fields
    return this.formFieldRepository.findMany({
      where: { documentGroupId, isEnabled: true, deletedAt: null },
      orderBy: { order: 'asc' },
    });
  }

  /**
   * List form fields for a given documentGroupId, enriched with the
   * VehicleDocument record for the given vehicleId (if it exists).
   *
   * Filters:
   *  - Fields belong to the given documentGroupId (matches the group)
   *  - VehicleDocument.vehicleId === vehicleId AND VehicleDocument.documentGroupId === documentGroupId
   */
  async getFieldsByGroupAndVehicle(vehicleId: string, documentGroupId: string) {
    // Verify the document group exists
    const documentGroup = await this.documentGroupRepository.findById(documentGroupId);
    if (!documentGroup) {
      throw new NotFoundException(`Document group '${documentGroupId}' not found`);
    }

    // Fetch all enabled, non-deleted fields for the group
    const fields = await this.formFieldRepository.findMany({
      where: {
        documentGroupId,
        isEnabled: true,
        deletedAt: null,
      },
      orderBy: { order: 'asc' },
    });

    // Fetch VehicleDocument records for this vehicle + group combination
    // There may be one per formFieldId (or one aggregate without formFieldId)
    // Using 'any' cast to handle stale Prisma client types (pending `prisma generate`)
    const vehicleDocs = (await (this.prisma.vehicleDocument as any).findMany({
      where: {
        vehicleId,
        documentGroupId,
      },
    })) as any[];

    // Build a lookup: formFieldId → vehicleDocument (null key for group-level doc)
    const vehicleDocByFieldId = new Map<string | null, any>();
    for (const vd of vehicleDocs) {
      vehicleDocByFieldId.set(vd.formFieldId ?? null, vd);
    }

    return {
      documentGroup: {
        id: documentGroup.id,
        name: documentGroup.name,
        identifier: documentGroup.identifier,
        order: documentGroup.order,
        description: documentGroup.description,
      },
      vehicleId,
      fields: fields.map((field) => {
        // Try field-specific doc, then group-level doc (formFieldId = null)
        const vehicleDoc =
          vehicleDocByFieldId.get(field.id) ??
          vehicleDocByFieldId.get(null) ??
          null;

        return {
          id: field.id,
          type: field.type,
          label: field.label,
          fieldKey: field.fieldKey,
          placeholder: field.placeholder,
          defaultValue: field.defaultValue,
          isRequired: field.isRequired,
          order: field.order,
          validation: field.validation,
          options: field.options,
          endpoint: field.endpoint,
          conditions: field.conditions,
          isEnabled: field.isEnabled,
          documentGroupId: field.documentGroupId,
          // Saved vehicle document data for this field (if any)
          vehicleDocument: vehicleDoc
            ? {
              id: vehicleDoc.id,
              status: vehicleDoc.status,
              documentSpec: vehicleDoc.documentSpec,
              submittedBy: vehicleDoc.submittedBy,
              createdAt: vehicleDoc.createdAt,
              updatedAt: vehicleDoc.updatedAt,
            }
            : null,
        };
      }),
    };
  }
}
