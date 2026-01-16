import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

export class UserSeeder {
    static async seed(prisma: PrismaClient) {
        const superAdminEmail = 'superadmin@carreport.com';
        const superAdminMobile = '+1234567890';

        // Check if super admin already exists
        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [
                    { email: superAdminEmail },
                    { mobile: superAdminMobile },
                ],
            },
        });

        if (existingUser) {
            console.log(`  ⊗ Super admin user already exists: ${superAdminEmail}`);
            return;
        }

        // Get super_admin role
        const superAdminRole = await prisma.role.findFirst({
            where: { identifier: 'super_admin' },
        });

        if (!superAdminRole) {
            throw new Error('Super admin role not found. Please run role seeder first.');
        }

        // Hash password
        const hashedPassword = await bcrypt.hash('Admin@123', 10);

        // Create super admin user
        const user = await prisma.user.create({
            data: {
                name: 'Super Admin',
                email: superAdminEmail,
                mobile: superAdminMobile,
                password: hashedPassword,
                emailVerifiedAt: new Date(),
                mobileVerifiedAt: new Date(),
            },
        });

        console.log(`  ✓ Created super admin user: ${user.email}`);

        // Assign super_admin role to user
        await prisma.userRole.create({
            data: {
                userId: user.id,
                roleId: superAdminRole.id,
            },
        });

        console.log(`  ✓ Assigned super_admin role to user`);

    }
}
