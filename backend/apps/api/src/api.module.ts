import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { BranchModule } from './branch/branch.module';

@Module({
  imports: [UserModule, RoleModule, BranchModule],
  controllers: [ApiController],
  providers: [ApiService],
})
export class ApiModule {}
