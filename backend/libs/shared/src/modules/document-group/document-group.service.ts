import { Injectable } from '@nestjs/common';
import { DocumentGroupRepository } from './repository/document-group.repository';

@Injectable()
export class SharedDocumentGroupService {
    constructor(
        public readonly repository: DocumentGroupRepository,
    ) { }
}
