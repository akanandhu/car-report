import { Injectable } from '@nestjs/common';
import { DocumentGroupRepository } from './repository/document-group.repository';
import { PrismaService } from '@shared/database/prisma/prisma.service';

@Injectable()
export class SharedDocumentGroupService {
    constructor(
        public readonly repository: DocumentGroupRepository,
        private readonly prisma: PrismaService,
    ) { }

    /**
     * List document groups that have at least one VehicleDocument
     * for the given vehicleId. Optionally further filtered by groupId.
     */
    async listByVehicleId(vehicleId: string, groupId?: string) {
        // Find all VehicleDocument records for this vehicle
        const vehicleDocs = await this.prisma.vehicleDocument.findMany({
            where: {
                vehicleId,
                ...(groupId ? { documentGroupId: groupId } : {}),
            },
            select: { documentGroupId: true },
            distinct: ['documentGroupId'],
        });

        const groupIds = vehicleDocs.map((d) => d.documentGroupId);

        if (groupIds.length === 0) {
            return [];
        }

        return this.repository.findMany({
            where: { id: { in: groupIds } },
            orderBy: { order: 'asc' },
        });
    }
}
