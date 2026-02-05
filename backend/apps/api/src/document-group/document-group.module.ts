import { Module } from '@nestjs/common';
import { DocumentGroupController } from './document-group.controller';
import { SharedDocumentGroupModule } from '@shared/modules/document-group/document-group.module';

@Module({
    imports: [SharedDocumentGroupModule],
    controllers: [DocumentGroupController],
})
export class DocumentGroupModule { }
