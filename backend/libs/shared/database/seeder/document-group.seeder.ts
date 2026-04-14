import { PrismaClient } from '@prisma/client';

export class DocumentGroupSeeder {
  static async seed(prisma: PrismaClient) {
    const groups = [
      {
        name: 'Test drive',
        identifier: 'test_drive',
      },
      {
        name: 'Features',
        identifier: 'features',
      },
      {
        name: 'Air conditioning',
        identifier: 'air_conditioning',
      },
      {
        name: 'Basic',
        identifier: 'basic',
      },
      {
        name: 'RC',
        identifier: 'rc',
      },
      {
        name: 'Exterior & Interior',
        identifier: 'exterior_interior',
      },
      {
        name: 'Interior & Electrical',
        identifier: 'interior_electrical',
      },
    ];

    for (const [index, group] of groups.entries()) {
      const existingGroup = await prisma.documentGroup.findFirst({
        where: { identifier: group.identifier },
      });

      if (!existingGroup) {
        await prisma.documentGroup.create({
          data: {
            ...group,
            order: (index + 1) * 10,
            isEnabled: true,
          },
        });
        console.log(`  ✓ Created document group: ${group.name}`);
      } else {
        console.log(`  ⊗ Document group already exists: ${group.name}`);
      }
    }
  }
}
