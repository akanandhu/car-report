import { Controller } from '@nestjs/common';
import { SharedVehicleService } from '@shared/modules/vehicle/vehicle.service';

@Controller('vehicles')
export class VehicleController {
  constructor(private readonly sharedVehicleService: SharedVehicleService) { }
}
