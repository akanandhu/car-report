import { Controller } from '@nestjs/common';
import { SharedRoleService } from 'shared/shared/modules/role/role.service';
import { RoleRepository } from 'shared/shared/modules/role/repository/role.repository';

@Controller('roles')
export class RoleController {
  constructor(
    private readonly sharedRoleService: SharedRoleService,
    private readonly roleRepository: RoleRepository,
  ) {}
}
