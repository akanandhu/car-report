import { Controller } from '@nestjs/common';
import { SharedVehicleService } from 'shared/shared/modules/vehicle/vehicle.service';
import { VehicleRepository } from 'shared/shared/modules/vehicle/repository/vehicle.repository';

@Controller('vehicles')
export class VehicleController {
  constructor(
    private readonly sharedVehicleService: SharedVehicleService,
    private readonly vehicleRepository: VehicleRepository,
  ) {}
}
