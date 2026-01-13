import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { UserModule } from './user/user.module';
import { VehicleModule } from './vehicle/vehicle.module';

@Module({
  imports: [UserModule, VehicleModule],
  controllers: [ApiController],
  providers: [ApiService],
})
export class ApiModule {}
