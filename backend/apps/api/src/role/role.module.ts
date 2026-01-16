import { Module } from '@nestjs/common';
import { RoleController } from './role.controller';
import { SharedRoleModule } from '@shared/modules/role/role.module';

@Module({
  imports: [SharedRoleModule],
  controllers: [RoleController],
})
export class RoleModule { }
