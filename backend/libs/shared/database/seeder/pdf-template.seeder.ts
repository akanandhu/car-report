import { PrismaClient } from '@prisma/client';

export class PdfTemplateSeeder {
    static async seed(prisma: PrismaClient) {
        const templates = [
            {
                identifier: 'template-default',
                name: 'Default Template',
                description: 'Standard default pdf reporting template',
            },
            // {
            //     identifier: 'template-premium',
            //     name: 'Premium Template',
            //     description: 'Premium pdf reporting template with extended details',
            // }
        ];

        for (const template of templates) {
            const existing = await prisma.pdfTemplate.findFirst({
                where: { identifier: template.identifier },
            });

            if (existing) {
                console.log(`  ⊗ PdfTemplate already exists: ${template.identifier}`);
                continue;
            }

            await prisma.pdfTemplate.create({
                data: template,
            });

            console.log(`  ✓ Created PdfTemplate: ${template.identifier}`);
        }
    }
}
