import { Module } from '@nestjs/common';
import { SharedVehicleService } from './vehicle.service';
import { VehicleUtilsService } from './service/vehicle.utils.service';

@Module({
  providers: [SharedVehicleService, VehicleUtilsService],
  exports: [SharedVehicleService],
})
export class SharedVehicleModule {}
