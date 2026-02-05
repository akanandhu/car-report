import { Injectable } from '@nestjs/common';
import { VehicleDocument } from '@prisma/client';
import { BaseRepository } from '@shared/common/repository/base.repository';
import { PrismaService } from '@shared/database/prisma/prisma.service';

@Injectable()
export class VehicleDocumentRepository extends BaseRepository<VehicleDocument> {
    protected readonly modelName = 'vehicleDocument';

    constructor(prisma: PrismaService) {
        super(prisma);
    }
}
