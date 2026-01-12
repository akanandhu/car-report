import { Injectable } from '@nestjs/common';
import { UserRoleRepository } from '../../repositories/role.repository';
import { AuthRole } from '../../common/constants/constants';

@Injectable()
export class AuthRoleService {
  constructor(private readonly userRoleRepository: UserRoleRepository) {}

  /**
   * Assign a role to a user
   * @param userId User ID
   * @param role Role to assign
   * @returns True if role was assigned successfully
   */
  async assignRoleToUser(userId: string, role: AuthRole): Promise<boolean> {
    // Check if user already has this role
    const hasRole = await this.userRoleRepository.userHasRole(userId, role);
    if (hasRole) {
      return true;
    }

    // Assign role to user
    await this.userRoleRepository.assignRoleByName(userId, role);
    return true;
  }

  /**
   * Get all roles for a user
   * @param userId User ID
   * @returns Array of role names
   */
  async getUserRoles(userId: string): Promise<string[]> {
    return this.userRoleRepository.getUserRoleNames(userId);
  }

  /**
   * Get permissions for a user based on their roles
   * This is a placeholder for a more complex permission system
   * @param userId User ID
   * @returns Array of permission strings
   */
  async getUserPermissions(userId: string): Promise<string[]> {
    const roles = await this.userRoleRepository.getUserRoles(userId);

    const permissions: string[] = [];
    //TODO: This should be replaced with a proper permission system
    for (const role of roles) {
      switch (role.name) {
        case AuthRole.SUPER_ADMIN:
          permissions.push('admin:*');
          break;
        case AuthRole.RIDER:
          permissions.push('rides:book');
          permissions.push('rides:view');
          permissions.push('profile:edit');
          break;
        case AuthRole.DRIVER:
          permissions.push('rides:accept');
          permissions.push('rides:complete');
          permissions.push('rides:view');
          permissions.push('profile:edit');
          break;
        default:
          permissions.push('profile:view');
      }
    }

    return [...new Set(permissions)]; // Remove duplicates
  }
}
