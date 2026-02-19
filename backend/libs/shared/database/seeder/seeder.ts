import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import { RoleSeeder } from './role.seeder';
import { UserSeeder } from './user.seeder';
import { FormConfigSeeder } from './form-config.seeder';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    console.log('🌱 Starting database seeding...\n');

    try {
        // Seed roles first (required for user seeding)
        console.log('📝 Seeding roles...');
        await RoleSeeder.seed(prisma);
        console.log('✅ Roles seeded successfully\n');

        // Seed super admin user
        console.log('👤 Seeding super admin user...');
        await UserSeeder.seed(prisma);
        console.log('✅ Super admin user seeded successfully\n');

        // Seed form configuration (types, steps, fields)
        console.log('📋 Seeding form configuration...');
        await FormConfigSeeder.seed(prisma);
        console.log('✅ Form configuration seeded successfully\n');

        console.log('🎉 All seeders completed successfully!');
    } catch (error) {
        console.error('❌ Error during seeding:', error);
        throw error;
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
