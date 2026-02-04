import { Injectable } from '@nestjs/common';
import { Vehicle } from '@prisma/client';
import { BaseRepository } from '@shared/common/repository/base.repository';
import { PrismaService } from '@shared/database/prisma/prisma.service';

@Injectable()
export class VehicleRepository extends BaseRepository<Vehicle> {
  protected readonly modelName = 'vehicle';

  constructor(prisma: PrismaService) {
    super(prisma);
  }
}
