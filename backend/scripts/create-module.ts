import * as fs from 'fs';
import * as path from 'path';

// Helper function to capitalize first letter
function capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Helper function to convert kebab-case to PascalCase
function toPascalCase(str: string): string {
    return str
        .split('-')
        .map((word) => capitalize(word))
        .join('');
}

// Helper function to convert kebab-case to camelCase
function toCamelCase(str: string): string {
    const parts = str.split('-');
    return parts[0] + parts.slice(1).map((word) => capitalize(word)).join('');
}

// Helper function to create directory if it doesn't exist
function ensureDir(dirPath: string): void {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
}

// Helper function to write file
function writeFile(filePath: string, content: string): void {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`✓ Created: ${filePath}`);
}

// Generate shared module files
function generateSharedModule(moduleName: string, basePath: string): void {
    const pascalModuleName = toPascalCase(moduleName);
    const camelModuleName = toCamelCase(moduleName);
    const sharedModulePath = path.join(
        basePath,
        'libs',
        'shared',
        'src',
        'modules',
        moduleName,
    );

    // Create directories
    ensureDir(sharedModulePath);
    ensureDir(path.join(sharedModulePath, 'service'));
    ensureDir(path.join(sharedModulePath, 'interface'));
    ensureDir(path.join(sharedModulePath, 'repository'));

    // 1. Create {moduleName}.service.ts
    const serviceContent = `import { Injectable } from '@nestjs/common';
import { ${pascalModuleName}UtilsService } from './service/${moduleName}.utils.service';
import { ${pascalModuleName}Repository } from './repository/${moduleName}.repository';

@Injectable()
export class Shared${pascalModuleName}Service {
  constructor(
    private readonly ${camelModuleName}UtilsService: ${pascalModuleName}UtilsService,
    private readonly ${camelModuleName}Repository: ${pascalModuleName}Repository,
  ) {}
}
`;
    writeFile(path.join(sharedModulePath, `${moduleName}.service.ts`), serviceContent);

    // 2. Create {moduleName}.module.ts
    const moduleContent = `import { Module } from '@nestjs/common';
import { Shared${pascalModuleName}Service } from './${moduleName}.service';
import { ${pascalModuleName}UtilsService } from './service/${moduleName}.utils.service';
import { ${pascalModuleName}Repository } from './repository/${moduleName}.repository';

@Module({
  providers: [Shared${pascalModuleName}Service, ${pascalModuleName}UtilsService, ${pascalModuleName}Repository],
  exports: [Shared${pascalModuleName}Service],
})
export class Shared${pascalModuleName}Module {}
`;
    writeFile(path.join(sharedModulePath, `${moduleName}.module.ts`), moduleContent);

    // 3. Create service/{moduleName}.utils.service.ts
    const utilsServiceContent = `import { Injectable } from '@nestjs/common';

@Injectable()
export class ${pascalModuleName}UtilsService {}
`;
    writeFile(
        path.join(sharedModulePath, 'service', `${moduleName}.utils.service.ts`),
        utilsServiceContent,
    );

    // 4. Create interface/{moduleName}.interface.ts
    const interfaceContent = `
import { BaseModel } from "shared/shared/common/interface/base-model.interface";

export interface ${pascalModuleName}Interface extends BaseModel {}
`;
    writeFile(
        path.join(sharedModulePath, 'interface', `${moduleName}.interface.ts`),
        interfaceContent,
    );

    // 5. Create repository/{moduleName}.repository.ts
    const repositoryContent = `import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/database/prisma/prisma.service';
import { ${pascalModuleName}Interface } from '../interface/${moduleName}.interface';

@Injectable()
export class ${pascalModuleName}Repository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Partial<${pascalModuleName}Interface>): Promise<${pascalModuleName}Interface> {
    return this.prisma.${camelModuleName}.create({ data }) as Promise<${pascalModuleName}Interface>;
  }

  async findById(id: string): Promise<${pascalModuleName}Interface | null> {
    return this.prisma.${camelModuleName}.findUnique({ where: { id } }) as Promise<${pascalModuleName}Interface | null>;
  }

  async findAll(): Promise<${pascalModuleName}Interface[]> {
    return this.prisma.${camelModuleName}.findMany() as Promise<${pascalModuleName}Interface[]>;
  }

  async update(id: string, data: Partial<${pascalModuleName}Interface>): Promise<${pascalModuleName}Interface> {
    return this.prisma.${camelModuleName}.update({ where: { id }, data }) as Promise<${pascalModuleName}Interface>;
  }

  async delete(id: string): Promise<${pascalModuleName}Interface> {
    return this.prisma.${camelModuleName}.delete({ where: { id } }) as Promise<${pascalModuleName}Interface>;
  }
}
`;
    writeFile(
        path.join(sharedModulePath, 'repository', `${moduleName}.repository.ts`),
        repositoryContent,
    );
}

// Generate API module files
function generateApiModule(moduleName: string, basePath: string): void {
    const pascalModuleName = toPascalCase(moduleName);
    const camelModuleName = toCamelCase(moduleName);
    const apiModulePath = path.join(basePath, 'apps', 'api', 'src', moduleName);

    // Create directories
    ensureDir(apiModulePath);
    ensureDir(path.join(apiModulePath, 'dto'));

    // 1. Create {moduleName}.controller.ts
    const controllerContent = `import { Controller } from '@nestjs/common';
import { Shared${pascalModuleName}Service } from 'shared/shared/modules/${moduleName}/${moduleName}.service';
import { ${pascalModuleName}Repository } from 'shared/shared/modules/${moduleName}/repository/${moduleName}.repository';

@Controller('${moduleName}s')
export class ${pascalModuleName}Controller {
  constructor(
    private readonly shared${pascalModuleName}Service: Shared${pascalModuleName}Service,
    private readonly ${camelModuleName}Repository: ${pascalModuleName}Repository,
  ) {}
}
`;
    writeFile(path.join(apiModulePath, `${moduleName}.controller.ts`), controllerContent);

    // 2. Create {moduleName}.module.ts
    const moduleContent = `import { Module } from '@nestjs/common';
import { ${pascalModuleName}Controller } from './${moduleName}.controller';
import { Shared${pascalModuleName}Module } from 'shared/shared/modules/${moduleName}/${moduleName}.module';

@Module({
  imports: [Shared${pascalModuleName}Module],
  controllers: [${pascalModuleName}Controller],
})
export class ${pascalModuleName}Module {}
`;
    writeFile(path.join(apiModulePath, `${moduleName}.module.ts`), moduleContent);

    // 3. Create dto/{moduleName}.dto.ts
    const dtoContent = `export class ${pascalModuleName}ResponseDto {}

export class Create${pascalModuleName}Dto {}

export class Update${pascalModuleName}Dto {}
`;
    writeFile(path.join(apiModulePath, 'dto', `${moduleName}.dto.ts`), dtoContent);
}

// Update api.module.ts to include the new module
function updateApiModule(moduleName: string, basePath: string): void {
    const pascalModuleName = toPascalCase(moduleName);
    const apiModulePath = path.join(basePath, 'apps', 'api', 'src', 'api.module.ts');

    let content = fs.readFileSync(apiModulePath, 'utf-8');

    // Add import statement
    const importStatement = `import { ${pascalModuleName}Module } from './${moduleName}/${moduleName}.module';\n`;

    // Find the last import statement and add new import after it
    const lastImportIndex = content.lastIndexOf('import ');
    const endOfLastImport = content.indexOf('\n', lastImportIndex);
    content = content.slice(0, endOfLastImport + 1) + importStatement + content.slice(endOfLastImport + 1);

    // Add module to imports array
    const importsMatch = content.match(/imports:\s*\[([\s\S]*?)\]/);
    if (importsMatch) {
        const currentImports = importsMatch[1].trim();
        let newImports;

        if (currentImports === '') {
            // Empty imports array
            newImports = `${pascalModuleName}Module`;
        } else {
            // Has existing imports
            newImports = `${currentImports}, ${pascalModuleName}Module`;
        }

        content = content.replace(
            /imports:\s*\[([\s\S]*?)\]/,
            `imports: [${newImports}]`,
        );
    }

    writeFile(apiModulePath, content);
}

// Main function
function main(): void {
    const args = process.argv.slice(2);

    if (args.length === 0) {
        console.error('❌ Error: Module name is required');
        console.log('Usage: pnpm create:module <module-name>');
        console.log('Example: pnpm create:module user');
        process.exit(1);
    }

    const moduleName = args[0].toLowerCase();
    const basePath = path.join(__dirname, '..');

    console.log(`\n🚀 Creating module: ${moduleName}\n`);

    try {
        // Generate shared module
        console.log('📦 Generating shared module files...');
        generateSharedModule(moduleName, basePath);

        // Generate API module
        console.log('\n📦 Generating API module files...');
        generateApiModule(moduleName, basePath);

        // Update api.module.ts
        console.log('\n📝 Updating api.module.ts...');
        updateApiModule(moduleName, basePath);

        console.log('\n✅ Module created successfully!\n');
        console.log('Created files:');
        console.log(`  - libs/shared/src/modules/${moduleName}/${moduleName}.service.ts`);
        console.log(`  - libs/shared/src/modules/${moduleName}/${moduleName}.module.ts`);
        console.log(`  - libs/shared/src/modules/${moduleName}/service/${moduleName}.utils.service.ts`);
        console.log(`  - libs/shared/src/modules/${moduleName}/repository/${moduleName}.repository.ts`);
        console.log(`  - libs/shared/src/modules/${moduleName}/interface/${moduleName}.interface.ts`);
        console.log(`  - apps/api/src/${moduleName}/${moduleName}.controller.ts`);
        console.log(`  - apps/api/src/${moduleName}/${moduleName}.module.ts`);
        console.log(`  - apps/api/src/${moduleName}/dto/${moduleName}.dto.ts`);
        console.log(`  - Updated: apps/api/src/api.module.ts\n`);
    } catch (error) {
        console.error('❌ Error creating module:', error);
        process.exit(1);
    }
}

main();
