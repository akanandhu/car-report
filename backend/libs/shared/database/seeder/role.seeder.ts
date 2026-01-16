import { PrismaClient } from '@prisma/client';

export class RoleSeeder {
    static async seed(prisma: PrismaClient) {
        const roles = [
            {
                name: 'Super Admin',
                identifier: 'super_admin',
            },
            {
                name: 'Client',
                identifier: 'client',
            },
            {
                name: 'Staff',
                identifier: 'staff',
            },
        ];

        for (const role of roles) {
            const existingRole = await prisma.role.findFirst({
                where: { identifier: role.identifier },
            });

            if (!existingRole) {
                await prisma.role.create({
                    data: role,
                });
                console.log(`  ✓ Created role: ${role.name} (${role.identifier})`);
            } else {
                console.log(`  ⊗ Role already exists: ${role.name} (${role.identifier})`);
            }
        }
    }
}
