import { Controller } from '@nestjs/common';
import { SharedRoleService } from '@shared/modules/role/role.service';

@Controller('roles')
export class RoleController {
  constructor(
    private readonly sharedRoleService: SharedRoleService,
  ) { }
}
