import { Controller, UseGuards } from '@nestjs/common';
import { SharedRoleService } from '@shared/modules/role/role.service';
import { JwtAuthGuard } from '@shared/modules/auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('roles')
export class RoleController {
  constructor(private readonly sharedRoleService: SharedRoleService) {}
}
