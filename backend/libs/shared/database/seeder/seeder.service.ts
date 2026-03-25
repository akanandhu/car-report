import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@shared/database/prisma/prisma.service';
import { RoleSeeder } from './role.seeder';
import { UserSeeder } from './user.seeder';
import { FormConfigSeeder } from './form-config.seeder';
import { DocumentGroupSeeder } from './document-group.seeder';
import { PdfTemplateSeeder } from './pdf-template.seeder';

export interface SeederResult {
    success: boolean;
    message: string;
    details: {
        seeder: string;
        status: 'success' | 'failed';
        error?: string;
    }[];
    executedAt: string;
}

@Injectable()
export class SeederService {
    private readonly logger = new Logger(SeederService.name);

    constructor(private readonly prisma: PrismaService) { }

    async runAll(): Promise<SeederResult> {
        this.logger.log('🌱 Starting database seeding via API...');

        const details: SeederResult['details'] = [];

        const seeders: Array<{ name: string; fn: () => Promise<void> }> = [
            {
                name: 'RoleSeeder',
                fn: () => RoleSeeder.seed(this.prisma),
            },
            {
                name: 'UserSeeder',
                fn: () => UserSeeder.seed(this.prisma),
            },
            {
                name: 'DocumentGroupSeeder',
                fn: () => DocumentGroupSeeder.seed(this.prisma),
            },
            {
                name: 'FormConfigSeeder',
                fn: () => FormConfigSeeder.seed(this.prisma),
            },
            {
                name: 'PdfTemplateSeeder',
                fn: () => PdfTemplateSeeder.seed(this.prisma as any),
            },
        ];

        let hasFailure = false;

        for (const seeder of seeders) {
            try {
                this.logger.log(`  ▶ Running ${seeder.name}...`);
                await seeder.fn();
                this.logger.log(`  ✅ ${seeder.name} completed`);
                details.push({ seeder: seeder.name, status: 'success' });
            } catch (err: any) {
                hasFailure = true;
                this.logger.error(`  ❌ ${seeder.name} failed: ${err?.message}`);
                details.push({
                    seeder: seeder.name,
                    status: 'failed',
                    error: err?.message ?? 'Unknown error',
                });
            }
        }

        const result: SeederResult = {
            success: !hasFailure,
            message: hasFailure
                ? 'Seeding completed with errors. Check details.'
                : '🎉 All seeders completed successfully!',
            details,
            executedAt: new Date().toISOString(),
        };

        this.logger.log(result.message);
        return result;
    }
}
