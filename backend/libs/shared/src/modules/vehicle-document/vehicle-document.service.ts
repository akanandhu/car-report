import { Injectable } from '@nestjs/common';
import { VehicleDocumentRepository } from './repository/vehicle-document.repository';

@Injectable()
export class SharedVehicleDocumentService {
    constructor(
        public readonly repository: VehicleDocumentRepository,
    ) { }
}
