import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/database/prisma/prisma.service';

@Injectable()
export class RtoService {
  constructor(private readonly prisma: PrismaService) {}

  async getIndianStates() {
    const states = await this.prisma.indianState.findMany({
      where: {
        isEnabled: true,
        deletedAt: null,
      },
      orderBy: {
        name: 'asc',
      },
    });

    return {
      options: states.map((state) => ({
        label: state.name,
        value: state.code,
      })),
    };
  }

  async getRtosByState(state: string) {
    const normalizedState = state?.trim().toUpperCase();
    if (!normalizedState) {
      return { options: [] };
    }

    const indianState = await this.prisma.indianState.findUnique({
      where: { code: normalizedState },
      select: { id: true },
    });

    if (!indianState) {
      return { options: [] };
    }

    const rtos = await this.prisma.rto.findMany({
      where: {
        stateId: indianState.id,
        isEnabled: true,
        deletedAt: null,
      },
      orderBy: {
        code: 'asc',
      },
    });

    return {
      options: rtos.map((rto) => ({
        label: `${rto.code} - ${rto.name}`,
        value: rto.code,
      })),
    };
  }
}
