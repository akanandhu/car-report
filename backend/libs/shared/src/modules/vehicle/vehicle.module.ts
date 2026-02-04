import { Module } from '@nestjs/common';
import { SharedVehicleService } from './vehicle.service';
import { VehicleUtilsService } from './service/vehicle.utils.service';
import { VehicleRepository } from './repository/vehicle.repository';
import { PrismaModule } from '@shared/database/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [SharedVehicleService, VehicleUtilsService, VehicleRepository],
  exports: [SharedVehicleService],
})
export class SharedVehicleModule { }
