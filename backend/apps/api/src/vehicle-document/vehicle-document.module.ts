import { Module } from '@nestjs/common';
import { VehicleDocumentController } from './vehicle-document.controller';
import { SharedVehicleDocumentModule } from '@shared/modules/vehicle-document/vehicle-document.module';

@Module({
    imports: [SharedVehicleDocumentModule],
    controllers: [VehicleDocumentController],
})
export class VehicleDocumentModule { }
