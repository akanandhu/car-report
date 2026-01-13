# Module Creation - Updated Guide

## Overview

The `create:module` script now focuses on generating backend code structure without Prisma schema generation. You manage your Prisma schema manually in `prisma/schema.prisma`.

## Creating a New Module

```bash
pnpm create:module [module-name]
```

Example:
```bash
pnpm create:module vehicle
```

## What Gets Created

### Shared Module (`libs/shared/src/modules/{module-name}/`)
- ✅ **`{module-name}.service.ts`** - Main service with repository injection
- ✅ **`{module-name}.module.ts`** - Module definition with providers
- ✅ **`service/{module-name}.utils.service.ts`** - Utility service
- ✅ **`repository/{module-name}.repository.ts`** - Repository with CRUD operations
- ✅ **`interface/{module-name}.interface.ts`** - TypeScript interface

### API Module (`apps/api/src/{module-name}/`)
- ✅ **`{module-name}.controller.ts`** - REST controller with repository injection
- ✅ **`{module-name}.module.ts`** - API module definition
- ✅ **`dto/{module-name}.dto.ts`** - DTOs for requests/responses

### Automatic Updates
- ✅ **`apps/api/src/api.module.ts`** - Auto-imports the new module

## Repository Pattern

Each generated repository includes these CRUD methods:

```typescript
@Injectable()
export class VehicleRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Partial<VehicleInterface>): Promise<VehicleInterface>
  async findById(id: string): Promise<VehicleInterface | null>
  async findAll(): Promise<VehicleInterface[]>
  async update(id: string, data: Partial<VehicleInterface>): Promise<VehicleInterface>
  async delete(id: string): Promise<VehicleInterface>
}
```

## Workflow

### 1. Create the Module
```bash
pnpm create:module vehicle
```

### 2. Add Prisma Model
Edit `prisma/schema.prisma` and add your model:

```prisma
model Vehicle {
  id           String   @id @default(uuid())
  make         String
  model        String
  year         Int
  licensePlate String   @unique @map("license_plate")
  createdAt    DateTime @default(now()) @map("created_at")
  updatedAt    DateTime @updatedAt @map("updated_at")

  @@map("vehicles")
}
```

### 3. Update Interface
Edit `libs/shared/src/modules/vehicle/interface/vehicle.interface.ts`:

```typescript
import { BaseModel } from "shared/shared/common/interface/base-model.interface";

export interface VehicleInterface extends BaseModel {
  make: string;
  model: string;
  year: number;
  licensePlate: string;
}
```

### 4. Run Migration
```bash
pnpm pmg
```

This will:
- Create a migration
- Apply it to the database
- Generate Prisma Client

### 5. Implement Business Logic

**Service** (`libs/shared/src/modules/vehicle/vehicle.service.ts`):
```typescript
@Injectable()
export class SharedVehicleService {
  constructor(
    private readonly vehicleUtilsService: VehicleUtilsService,
    private readonly vehicleRepository: VehicleRepository,
  ) {}

  async createVehicle(data: CreateVehicleDto) {
    // Your business logic here
    return this.vehicleRepository.create(data);
  }
}
```

**Controller** (`apps/api/src/vehicle/vehicle.controller.ts`):
```typescript
@Controller('vehicles')
export class VehicleController {
  constructor(
    private readonly sharedVehicleService: SharedVehicleService,
    private readonly vehicleRepository: VehicleRepository,
  ) {}

  @Post()
  async create(@Body() dto: CreateVehicleDto) {
    return this.sharedVehicleService.createVehicle(dto);
  }

  @Get()
  async findAll() {
    return this.vehicleRepository.findAll();
  }
}
```

## Environment Variables

Environment variables are loaded from `.env.docker` (priority) or `.env`:

```typescript
import { config } from '@shared/config';

const dbUrl = config.database.url;
const port = config.backend.port;
const apiUrl = config.backend.apiUrl;
```

## Module Structure

```
libs/shared/src/modules/vehicle/
├── vehicle.module.ts
├── vehicle.service.ts
├── interface/
│   └── vehicle.interface.ts
├── service/
│   └── vehicle.utils.service.ts
└── repository/
    └── vehicle.repository.ts

apps/api/src/vehicle/
├── vehicle.module.ts
├── vehicle.controller.ts
└── dto/
    └── vehicle.dto.ts
```

## Available Scripts

```bash
# Create a new module
pnpm create:module [module-name]

# Run migrations and generate Prisma Client
pnpm pmg

# Start development server
pnpm dev:api
```

## Key Features

### ✅ Repository Pattern
- Clean separation between database and business logic
- Easy to test with mock repositories
- Reusable CRUD operations

### ✅ Auto Dependency Injection
- Repository injected into service and controller
- Utils service injected into main service
- Proper NestJS module structure

### ✅ Type Safety
- TypeScript interfaces for all models
- Full type support in repositories
- DTOs for API contracts

### ✅ Convention Over Configuration
- Consistent naming patterns
- PascalCase for classes
- camelCase for variables
- kebab-case for file/folder names

## Best Practices

1. **Always update the interface** after modifying your Prisma model
2. **Use the repository** for all database operations
3. **Put business logic in the service**, not the controller
4. **Use DTOs** for request/response validation
5. **Extend repository methods** as needed for complex queries

## Example: Complete Vehicle Module

```bash
# 1. Create module
pnpm create:module vehicle

# 2. Add model to prisma/schema.prisma
# (see Workflow section above)

# 3. Update interface
# (see Workflow section above)

# 4. Run migration
pnpm pmg

# 5. Your module is ready!
```

## Troubleshooting

**Module not found errors?**
- Check that the module is imported in `api.module.ts`
- Verify import paths use the correct aliases

**Prisma model not found?**
- Make sure you've run `pnpm pmg` after adding the model
- Check Prisma schema syntax

**Repository errors?**
- Ensure the Prisma model name matches the camelCase version used in repository
- For `vehicle-type`, Prisma model should be `vehicleType` or `VehicleType`

## Support

For more details on the architecture and implementation, see:
- `IMPLEMENTATION_SUMMARY.md` - Complete implementation details
- Existing modules in `libs/shared/src/modules/` for examples
