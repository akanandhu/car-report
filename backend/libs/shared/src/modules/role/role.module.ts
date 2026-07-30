import { Module } from '@nestjs/common';
import { SharedRoleService } from './role.service';
import { RoleRepository } from './repository/role.repository';

@Module({
  providers: [SharedRoleService, RoleRepository],
  exports: [SharedRoleService],
})
export class SharedRoleModule {}
