import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { UserroleUtilsService } from './service/userrole.utils.service';
import { UserroleRepository } from './repository/userrole.repository';
import { RoleRepository } from '../role/repository/role.repository';
import { UserRepository } from '../user/repository/user.repository';

@Injectable()
export class SharedUserroleService {
  constructor(
    private readonly userroleUtilsService: UserroleUtilsService,
    private readonly userroleRepository: UserroleRepository,
    private readonly roleRepository: RoleRepository,
    private readonly userRepository: UserRepository,
  ) { }

  /**
   * Assign a role to a user
   * @param userId - User ID
   * @param roleIdentifier - Role identifier (e.g., 'client', 'staff', 'super_admin')
   */
  async assignRoleToUser(userId: string, roleIdentifier: string) {
    // Verify user exists
    const user = await this.userRepository.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Get role by identifier
    const role = await this.roleRepository.findFirst({
      where: { identifier: roleIdentifier },
    });

    if (!role) {
      throw new NotFoundException(`Role with identifier "${roleIdentifier}" not found`);
    }

    // Check if user already has this role
    const existingUserRole = await this.userroleRepository.findFirst({
      where: {
        userId: userId,
        roleId: role.id,
        deletedAt: null,
      },
    });

    if (existingUserRole) {
      throw new ConflictException('User already has this role assigned');
    }

    // Assign role to user
    const userRole = await this.userroleRepository.create({
      userId: userId,
      roleId: role.id,
    });

    return userRole;
  }

  /**
   * Get all roles for a user
   * @param userId - User ID
   */
  async getUserRoles(userId: string) {
    return this.userroleRepository.findMany({
      where: {
        userId: userId,
        deletedAt: null,
      },
      include: {
        role: true,
      },
    });
  }
}
