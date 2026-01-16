import { BranchRepository } from "@shared/modules/branch/repository/branch.repository";
import { RoleRepository } from "@shared/modules/role/repository/role.repository";
import { UserRepository } from "@shared/modules/user/repository/user.repository";
import { UserroleRepository } from "@shared/modules/userrole/repository/userrole.repository"

/**
 * Common repository providers
 * Import this in any module to get access to all repositories
 */
export const REPOSITORY_PROVIDERS = [
    UserRepository  ,
    RoleRepository,
    UserroleRepository,
    BranchRepository,
];
