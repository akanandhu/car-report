import { PrismaClient } from '@prisma/client';
import { RoleSeeder } from './role.seeder';
import { UserSeeder } from './user.seeder';
import { DocumentGroupSeeder } from './document-group.seeder';


const prisma = new PrismaClient();

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

        // Seed document groups
        console.log('📂 Seeding document groups...');
        await DocumentGroupSeeder.seed(prisma);
        console.log('✅ Document groups seeded successfully\n');

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
