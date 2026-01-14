import { Module } from '@nestjs/common';
import { SharedRoleService } from './role.service';
import { RoleUtilsService } from './service/role.utils.service';
import { RoleRepository } from './repository/role.repository';

@Module({
  providers: [SharedRoleService, RoleUtilsService, RoleRepository],
  exports: [SharedRoleService],
})
export class SharedRoleModule {}
