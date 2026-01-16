import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function question(prompt: string): Promise<string> {
    return new Promise((resolve) => {
        rl.question(prompt, (answer) => {
            resolve(answer);
        });
    });
}

async function main() {
    try {
        const modelName = await question('Enter model name: ');

        if (!modelName || modelName.trim() === '') {
            console.error('❌ Error: Model name is required');
            process.exit(1);
        }

        const trimmedModelName = modelName.trim().toLowerCase();
        const capitalizedModelName = capitalizeFirstLetter(trimmedModelName);

        // Check if model exists in Prisma schema
        const schemaPath = path.join(process.cwd(), 'prisma', 'schema.prisma');

        if (!fs.existsSync(schemaPath)) {
            console.error('❌ Error: Prisma schema file not found');
            process.exit(1);
        }

        const schemaContent = fs.readFileSync(schemaPath, 'utf-8');
        const modelRegex = new RegExp(`model\\s+${capitalizedModelName}\\s*{`, 'i');

        if (!modelRegex.test(schemaContent)) {
            console.error(`❌ Error: Model "${capitalizedModelName}" does not exist in Prisma schema`);
            process.exit(1);
        }

        // Create seeder file
        const seederDir = path.join(process.cwd(), 'libs', 'shared', 'database', 'seeder');
        const seederFilePath = path.join(seederDir, `${trimmedModelName}.seeder.ts`);

        if (fs.existsSync(seederFilePath)) {
            console.warn(`⚠️  Warning: Seeder file already exists: ${seederFilePath}`);
            const overwrite = await question('Do you want to overwrite it? (y/n): ');

            if (overwrite.toLowerCase() !== 'y') {
                console.log('✓ Operation cancelled');
                process.exit(0);
            }
        }

        // Create seeder directory if it doesn't exist
        if (!fs.existsSync(seederDir)) {
            fs.mkdirSync(seederDir, { recursive: true });
        }

        // Generate seeder content
        const seederContent = `import { PrismaClient } from '@prisma/client';

export class ${capitalizedModelName}Seeder {
  static async seed(prisma: PrismaClient) {
    // TODO: Add your seeding logic here
    
    // Example:
    // const data = [
    //   { field1: 'value1', field2: 'value2' },
    //   { field1: 'value3', field2: 'value4' },
    // ];

    // for (const item of data) {
    //   const existing = await prisma.${trimmedModelName}.findFirst({
    //     where: { /* your unique field */ },
    //   });

    //   if (!existing) {
    //     await prisma.${trimmedModelName}.create({
    //       data: item,
    //     });
    //     console.log(\`  ✓ Created ${trimmedModelName}: \${item.field1}\`);
    //   } else {
    //     console.log(\`  ⊗ ${capitalizedModelName} already exists: \${item.field1}\`);
    //   }
    // }
  }
}
`;

        // Write seeder file
        fs.writeFileSync(seederFilePath, seederContent);
        console.log(`✅ Created seeder file: ${seederFilePath}`);

        // Update main seeder file
        const mainSeederPath = path.join(seederDir, 'seeder.ts');

        if (fs.existsSync(mainSeederPath)) {
            let mainSeederContent = fs.readFileSync(mainSeederPath, 'utf-8');

            // Add import if not exists
            const importStatement = `import { ${capitalizedModelName}Seeder } from './${trimmedModelName}.seeder';`;
            if (!mainSeederContent.includes(importStatement)) {
                // Add import after the last import
                const lastImportIndex = mainSeederContent.lastIndexOf('import');
                const endOfLineIndex = mainSeederContent.indexOf('\n', lastImportIndex);
                mainSeederContent =
                    mainSeederContent.slice(0, endOfLineIndex + 1) +
                    importStatement + '\n' +
                    mainSeederContent.slice(endOfLineIndex + 1);
            }

            // Add seeder call (before the success message)
            const seederCall = `
    // Seed ${trimmedModelName}
    console.log('📝 Seeding ${trimmedModelName}...');
    await ${capitalizedModelName}Seeder.seed(prisma);
    console.log('✅ ${capitalizedModelName} seeded successfully\\n');
`;

            const successMessage = "console.log('🎉 All seeders completed successfully!')";
            if (!mainSeederContent.includes(`${capitalizedModelName}Seeder.seed`)) {
                mainSeederContent = mainSeederContent.replace(
                    successMessage,
                    seederCall + '\n    ' + successMessage
                );
            }

            fs.writeFileSync(mainSeederPath, mainSeederContent);
            console.log(`✅ Updated main seeder file: ${mainSeederPath}`);
            console.log('\n📝 Next steps:');
            console.log(`   1. Edit ${seederFilePath} and add your seeding logic`);
            console.log('   2. Run "pnpm run seed" to execute all seeders');
        }

    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    } finally {
        rl.close();
    }
}

main();
