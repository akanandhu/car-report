import { Injectable } from '@nestjs/common';

import { Vehicle } from '@prisma/client';
import { BaseRepository } from '@shared/common/repository/base.repository';
import { PrismaService } from 'libs/shared/database/prisma/prisma.service';

@Injectable()
export class VehicleRepository extends BaseRepository<Vehicle> {//here need to call the vehicle.prima model
  protected readonly modelName = 'vehicle';

  constructor(prisma: PrismaService) {
    super(prisma);
  }
}
