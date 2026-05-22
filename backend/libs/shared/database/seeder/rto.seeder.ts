import { PrismaClient } from '@prisma/client';
import { INDIAN_STATE_OPTIONS, RTO_OPTIONS_BY_STATE } from './rto-data';

export class RtoSeeder {
  static async seed(prisma: PrismaClient) {
    let stateCount = 0;
    let rtoCount = 0;

    for (const stateOption of INDIAN_STATE_OPTIONS) {
      const state = await prisma.indianState.upsert({
        where: { code: stateOption.value },
        update: {
          name: stateOption.label,
          isEnabled: true,
          deletedAt: null,
        },
        create: {
          code: stateOption.value,
          name: stateOption.label,
          isEnabled: true,
        },
      });

      stateCount++;

      const rtos = RTO_OPTIONS_BY_STATE[stateOption.value] ?? [];

      for (const rto of rtos) {
        const rtoName = rto.label.replace(`${rto.value} - `, '').trim();

        await prisma.rto.upsert({
          where: { code: rto.value },
          update: {
            stateId: state.id,
            name: rtoName,
            isEnabled: true,
            deletedAt: null,
          },
          create: {
            stateId: state.id,
            code: rto.value,
            name: rtoName,
            isEnabled: true,
          },
        });

        rtoCount++;
      }
    }

    console.log(
      `  ✓ RTO reference data seeded: ${stateCount} states/UTs, ${rtoCount} RTOs`,
    );
  }
}
