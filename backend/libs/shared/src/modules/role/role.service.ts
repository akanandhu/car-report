import { Injectable } from '@nestjs/common';
import { RoleRepository } from './repository/role.repository';

@Injectable()
export class SharedRoleService {
  constructor(private readonly roleRepository: RoleRepository) {}
}
