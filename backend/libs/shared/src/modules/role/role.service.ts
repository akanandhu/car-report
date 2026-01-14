import { Injectable } from '@nestjs/common';
import { RoleUtilsService } from './service/role.utils.service';
import { RoleRepository } from './repository/role.repository';

@Injectable()
export class SharedRoleService {
  constructor(
    private readonly roleUtilsService: RoleUtilsService,
    private readonly roleRepository: RoleRepository,
  ) {}
}
