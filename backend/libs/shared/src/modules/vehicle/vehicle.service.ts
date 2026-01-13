import { Injectable } from '@nestjs/common';
import { VehicleUtilsService } from './service/vehicle.utils.service';
import { VehicleRepository } from './repository/vehicle.repository';

@Injectable()
export class SharedVehicleService {
  constructor(
    private readonly vehicleUtilsService: VehicleUtilsService,
    private readonly vehicleRepository: VehicleRepository,
  ) {}
}
