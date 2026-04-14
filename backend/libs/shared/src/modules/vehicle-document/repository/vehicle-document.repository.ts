import { Injectable } from '@nestjs/common';
import { VehicleDocument } from '@prisma/client';
import { BaseRepository } from '@shared/common/repository/base.repository';
import { PrismaService } from '@shared/database/prisma/prisma.service';

@Injectable()
export class VehicleDocumentRepository extends BaseRepository<VehicleDocument> {
    protected readonly modelName = 'vehicleDocument';

    /**
     * VehicleDocument has no `deletedAt` column — disable soft-delete filtering.
     */
    protected readonly softDeleteEnabled = false;

    constructor(prisma: PrismaService) {
        super(prisma);
    }
}
