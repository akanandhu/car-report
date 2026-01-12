import { Module } from '@nestjs/common';
import { VehicleController } from './vehicle.controller';
import { SharedVehicleModule } from '@shared/modules/vehicle/vehicle.module';

@Module({
  imports: [SharedVehicleModule],
  controllers: [VehicleController],
})
export class VehicleModule { }
