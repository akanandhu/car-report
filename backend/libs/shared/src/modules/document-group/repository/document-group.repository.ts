import { Injectable } from '@nestjs/common';
import { DocumentGroup } from '@prisma/client';
import { BaseRepository } from '@shared/common/repository/base.repository';
import { PrismaService } from '@shared/database/prisma/prisma.service';

@Injectable()
export class DocumentGroupRepository extends BaseRepository<DocumentGroup> {
    protected readonly modelName = 'documentGroup';

    /**
     * DocumentGroup has no `deletedAt` column — disable soft-delete filtering.
     */
    protected readonly softDeleteEnabled = false;

    constructor(prisma: PrismaService) {
        super(prisma);
    }
}
