import { Injectable } from '@nestjs/common';
import { VehicleUtilsService } from './service/vehicle.utils.service';

@Injectable()
export class SharedVehicleService {
  constructor(private readonly vehicleUtilsService: VehicleUtilsService) {}
}
