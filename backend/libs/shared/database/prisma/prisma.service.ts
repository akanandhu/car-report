import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    // The pg package currently resolves as an error type in type-aware ESLint.
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });
    const adapter = new PrismaPg(pool);

    super({
      adapter,
      log: ['error', 'warn'],
    });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  async cleanDatabase() {
    if (process.env['NODE_ENV'] === 'production') return;

    const tableNames = Prisma.dmmf.datamodel.models
      .map((model) => model.dbName ?? model.name)
      .map((tableName) => `"${tableName.replaceAll('"', '""')}"`)
      .join(', ');

    // Identifiers cannot be parameterized; names come only from generated Prisma metadata.
    return this.$executeRawUnsafe(
      `TRUNCATE TABLE ${tableNames} RESTART IDENTITY CASCADE`,
    );
  }
}
