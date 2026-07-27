import { Injectable } from '@nestjs/common';
import { Prisma, UserRole } from '@prisma/client';
import { BaseRepository } from '@shared/common/repository/base.repository';
import { PrismaService } from '@shared/database/prisma/prisma.service';

@Injectable()
export class UserroleRepository extends BaseRepository<UserRole> {
  protected readonly modelName = 'userRole';

  constructor(prisma: PrismaService) {
    super(prisma);
  }

  async findManyWithRole(
    userId: string,
  ): Promise<Prisma.UserRoleGetPayload<{ include: { role: true } }>[]> {
    return this.prisma.userRole.findMany({
      where: { userId, deletedAt: null },
      include: { role: true },
    });
  }
}
