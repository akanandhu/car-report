import { Injectable, NotFoundException } from '@nestjs/common';
import { VehicleDocumentRepository } from './repository/vehicle-document.repository';
import { PrismaService } from '@shared/database/prisma/prisma.service';
import { DocumentGroupRepository } from '../document-group/repository/document-group.repository';

@Injectable()
export class SharedVehicleDocumentService {
    public readonly repository: VehicleDocumentRepository;
    private readonly documentGroupRepository: DocumentGroupRepository;

    constructor(
        private readonly prisma: PrismaService,
    ) {
        this.repository = new VehicleDocumentRepository(prisma);
        this.documentGroupRepository = new DocumentGroupRepository(prisma);
    }

    /**
     * Save form data for a specific step (creates or updates as DRAFT).
     * Upserts: if a document already exists for this vehicle + step, update it.
     */
    async saveStepData(
        vehicleId: string,
        data: {
            documentGroupId: string;
            documentSpec: Record<string, any>;
            submittedBy?: string;
            formFieldId?: string;
        },
    ) {
        // Check if a document already exists for this vehicle + step
        const existing = await this.repository.findFirst({
            where: {
                vehicleId,
                documentGroupId: data.documentGroupId,
                formFieldId: data.formFieldId,
            },
        });

        if (existing) {
            // Merge the new data with existing data (allows partial step saves)
            const mergedSpec = {
                ...(existing.documentSpec as Record<string, any> || {}),
                ...data.documentSpec,
            };

            return this.repository.update({
                where: { id: existing.id },
                data: {
                    documentSpec: mergedSpec,
                    submittedBy: data.submittedBy || existing.submittedBy,
                    status: 'DRAFT' as any,
                },
            });
        } else {
            return this.repository.create({
                vehicleId,
                documentGroupId: data.documentGroupId,
                documentSpec: data.documentSpec,
                submittedBy: data.submittedBy || null,
                formFieldId: data.formFieldId ?? null,
                status: 'DRAFT' as any,
            });
        }
    }

    /**
     * Submit all steps for a vehicle and type.
     * Changes all DRAFT documents for the given type's steps to SUBMITTED.
     */
    async submitAllSteps(
        vehicleId: string,
        type: string,
        submittedBy?: string,
    ) {
        // Find the type document group
        const typeGroup = await this.documentGroupRepository.findOne({
            where: { identifier: type.toUpperCase(), parentId: null },
        });

        if (!typeGroup) {
            throw new NotFoundException(`Form type '${type}' not found`);
        }

        // Get all step IDs for this type
        const steps = await this.documentGroupRepository.findMany({
            where: { parentId: typeGroup.id, isEnabled: true },
        });

        const stepIds = steps.map((s) => s.id);

        if (stepIds.length === 0) {
            throw new NotFoundException(`No steps found for form type '${type}'`);
        }

        // Update all DRAFT documents for these steps to SUBMITTED
        const result = await this.repository.updateMany(
            {
                vehicleId,
                documentGroupId: { in: stepIds },
                status: 'DRAFT',
            },
            {
                status: 'SUBMITTED' as any,
                submittedBy: submittedBy || undefined,
            } as any,
        );

        return {
            message: `${result.count} step(s) submitted successfully`,
            submittedCount: result.count,
            totalSteps: stepIds.length,
        };
    }

    /**
     * Get all saved form data for a vehicle, optionally filtered by type.
     */
    async getVehicleFormData(vehicleId: string, type?: string) {
        let stepIds: string[] | undefined;

        if (type) {
            const typeGroup = await this.documentGroupRepository.findOne({
                where: { identifier: type.toUpperCase(), parentId: null },
            });

            if (!typeGroup) {
                throw new NotFoundException(`Form type '${type}' not found`);
            }

            const steps = await this.documentGroupRepository.findMany({
                where: { parentId: typeGroup.id },
            });

            stepIds = steps.map((s) => s.id);
        }

        const where: any = { vehicleId };
        if (stepIds) {
            where.documentGroupId = { in: stepIds };
        }

        const documents = await this.repository.findMany({
            where,
            include: {
                documentGroup: {
                    select: {
                        id: true,
                        name: true,
                        identifier: true,
                        order: true,
                        parentId: true,
                    },
                },
            },
            orderBy: { createdAt: 'asc' },
        });

        return documents;
    }

    /**
     * Get form data for a specific step of a vehicle.
     */
    async getStepData(vehicleId: string, documentGroupId: string) {
        const document = await this.repository.findFirst({
            where: {
                vehicleId,
                documentGroupId,
            },
            include: {
                documentGroup: {
                    select: {
                        id: true,
                        name: true,
                        identifier: true,
                        order: true,
                    },
                },
            },
        });

        return document;
    }
}
