import { Module } from '@nestjs/common';
import { SharedVehicleService } from './vehicle.service';
import { VehicleUtilsService } from './service/vehicle.utils.service';
import { VehicleRepository } from './repository/vehicle.repository';

@Module({
  providers: [SharedVehicleService, VehicleUtilsService, VehicleRepository],
  exports: [SharedVehicleService],
})
export class SharedVehicleModule {}
