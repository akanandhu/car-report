import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';

@Module({
  imports: [UserModule, RoleModule],
  controllers: [ApiController],
  providers: [ApiService],
})
export class ApiModule {}
