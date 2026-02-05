import { Injectable } from '@nestjs/common';
import { DocumentGroup } from '@prisma/client';
import { BaseRepository } from '@shared/common/repository/base.repository';
import { PrismaService } from '@shared/database/prisma/prisma.service';

@Injectable()
export class DocumentGroupRepository extends BaseRepository<DocumentGroup> {
    protected readonly modelName = 'documentGroup';

    constructor(prisma: PrismaService) {
        super(prisma);
    }
}
