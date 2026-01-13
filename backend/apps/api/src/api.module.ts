import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule],
  controllers: [ApiController],
  providers: [ApiService],
})
export class ApiModule {}
