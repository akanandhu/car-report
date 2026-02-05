import { Module } from '@nestjs/common';
import { DocumentGroupRepository } from './repository/document-group.repository';
import { SharedDocumentGroupService } from './document-group.service';
// Assuming PrismaModule is global or needs import. Based on RoleModule, let's check if it imports PrismaModule.
// RoleModule usually imports PrismaModule if it's not global. But RoleRepository imports PrismaService directly.
// Let's import PrismaModule just in case, or if it's GLOBAL, maybe not needed.
// Checking RoleModule earlier might have helped. I will check RoleModule content.
import { PrismaModule } from '@shared/database/prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    providers: [DocumentGroupRepository, SharedDocumentGroupService],
    exports: [SharedDocumentGroupService, DocumentGroupRepository],
})
export class SharedDocumentGroupModule { }
