import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { PermissionsGuard } from '../guards/permissions.guard';
import { AuthRole } from '../../../common/constants/constants';

export const ROLES_KEY = 'roles';
export const PERMISSIONS_KEY = 'permissions';
export const IS_PUBLIC_KEY = 'isPublic';

export const Roles = (...roles: AuthRole[]) => SetMetadata(ROLES_KEY, roles);
export const Permissions = (...permissions: string[]) =>
  SetMetadata(PERMISSIONS_KEY, permissions);

export interface AuthOptions {
  roles?: AuthRole[];
  permissions?: string[];
}

/**
 * Auth decorator for protecting routes
 * @param options Options for authentication
 * @returns Decorator
 *
 * @example
 * // Protect route with JWT authentication
 * @Auth()
 *
 * @example
 * // Protect route with JWT authentication and role-based authorization
 * @Auth({ roles: [AuthRole.ADMIN] })
 *
 * @example
 * // Protect route with JWT authentication and permission-based authorization
 * @Auth({ permissions: ['users:read'] })
 *
 * @example
 * // Protect route with JWT authentication, role-based and permission-based authorization
 * @Auth({ roles: [AuthRole.ADMIN], permissions: ['users:read'] })
 */
export function Auth(options?: AuthOptions) {
  const decorators = [UseGuards(JwtAuthGuard)];

  if (options?.roles?.length) {
    decorators.push(Roles(...options.roles));
    decorators.push(UseGuards(RolesGuard));
  }

  if (options?.permissions?.length) {
    decorators.push(Permissions(...options.permissions));
    decorators.push(UseGuards(PermissionsGuard));
  }

  return applyDecorators(...decorators);
}

/**
 * Public decorator to skip JWT authentication for specific routes
 * Use this on endpoints that should be accessible without authentication
 *
 * @example
 * @Public()
 * @Get('public-endpoint')
 * async getPublicData() { ... }
 */
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
