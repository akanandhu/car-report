import { Module } from '@nestjs/common';
import { VehicleDocumentRepository } from './repository/vehicle-document.repository';
import { SharedVehicleDocumentService } from './vehicle-document.service';
import { PrismaModule } from '@shared/database/prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    providers: [VehicleDocumentRepository, SharedVehicleDocumentService],
    exports: [SharedVehicleDocumentService, VehicleDocumentRepository],
})
export class SharedVehicleDocumentModule { }
