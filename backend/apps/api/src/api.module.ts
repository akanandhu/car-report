import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { UserroleModule } from './userrole/userrole.module';

@Module({
  imports: [UserModule, RoleModule, UserroleModule],
  controllers: [ApiController],
  providers: [ApiService],
})
export class ApiModule {}
