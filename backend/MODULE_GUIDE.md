# Module Creation Guide - Updated

## 🚀 Quick Start

### Create a Module (Code Only)
```bash
pnpm create:module [module-name]
```

### Create a Module with Prisma Schema
```bash
pnpm create:module [module-name] -m
# or
pnpm create:module [module-name] --model
```

## 📋 What Gets Created

### Standard Module Creation
```bash
pnpm create:module vehicle
```

Creates:
```
✅ libs/shared/src/modules/vehicle/
   ├── vehicle.service.ts              # Service with repository
   ├── vehicle.module.ts               # Module definition
   ├── repository/
   │   └── vehicle.repository.ts      # Extends BaseRepository
   ├── service/
   │   └── vehicle.utils.service.ts
   └── interface/
       └── vehicle.interface.ts

✅ apps/api/src/vehicle/
   ├── vehicle.controller.ts           # Controller with repository
   ├── vehicle.module.ts
   └── dto/
       └── vehicle.dto.ts

✅ Auto-updates: apps/api/src/api.module.ts
```

### With `-m` Flag
```bash
pnpm create:module vehicle -m
```

Creates everything above **PLUS**:
```
✅ prisma/schema/vehicles.prisma        # Base Prisma model
```

## 🎨 Repository Pattern (NEW!)

Repositories now extend `BaseRepository` with built-in methods:

### Generated Repository
```typescript
import { Injectable } from '@nestjs/common';
import { Vehicle } from '@prisma/client';
import { BaseRepository } from '@shared/common/repository/base.repository';
import { PrismaService } from 'libs/shared/database/prisma/prisma.service';

@Injectable()
export class VehicleRepository extends BaseRepository<Vehicle> {
  protected readonly modelName = 'vehicle';

  constructor(prisma: PrismaService) {
    super(prisma);
  }
}
```

### Available Methods from BaseRepository

**CRUD Operations:**
- `create(data)` - Create a new record
- `findMany(options)` - Find multiple records
- `findOne(options)` - Find single record
- `findById(id, options)` - Find by ID
- `findUnique(options)` - Find unique record
- `update(options)` - Update a record
- `updateById(id, data, options)` - Update by ID
- `updateMany(where, data)` - Update multiple records

**Soft Delete (NEW!):**
- `softDelete(options)` - Soft delete a record
- `softDeleteById(id)` - Soft delete by ID
- `softDeleteMany(where)` - Soft delete multiple
- `restore(options)` - Restore soft-deleted record
- `restoreById(id)` - Restore by ID
- `restoreMany(where)` - Restore multiple
- `findSoftDeleted(options)` - Find soft-deleted records

**Hard Delete:**
- `hardDelete(options)` - Permanently delete
- `hardDeleteById(id)` - Permanently delete by ID
- `hardDeleteByIds(ids)` - Delete multiple by IDs
- `hardDeleteMany(where)` - Permanently delete multiple

**Utilities:**
- `count(where, includeSoftDeleted)` - Count records
- `exists(where, includeSoftDeleted)` - Check existence
- `upsert(where, create, update, options)` - Create or update
- `paginate(page, limit, options)` - Paginated results

## 📝 Generated Prisma Schema (with `-m`)

```prisma
model Vehicle {
  id        String    @id @default(uuid())
  createdAt DateTime  @default(now()) @map("created_at")
  updatedAt DateTime  @updatedAt @map("updated_at")
  deletedAt DateTime? @map("deleted_at")

  // Add your fields here

  // Relations

  @@map("vehicles")
}
```

## 🎯 Complete Workflow

### Option 1: Without Schema Generation
```bash
# 1. Create module
pnpm create:module vehicle

# 2. Manually add model to prisma/schema.prisma or prisma/schema/vehicles.prisma

# 3. Update interface to match

# 4. Run migration
pnpm pmg
```

### Option 2: With Schema Generation (Recommended)
```bash
# 1. Create module with schema
pnpm create:module vehicle -m

# 2. Edit generated prisma/schema/vehicles.prisma
# Add your custom fields

# 3. Update interface to match

# 4. Run migration
pnpm pmg
```

## 💡 Usage Examples

### Using Repository in Controller
```typescript
@Controller('vehicles')
export class VehicleController {
  constructor(
    private readonly vehicleRepository: VehicleRepository,
  ) {}

  @Get()
  async findAll() {
    return this.vehicleRepository.findMany({
      where: { /* conditions */ },
      orderBy: { createdAt: 'desc' },
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.vehicleRepository.findById(id);
  }

  @Post()
  async create(@Body() dto: CreateVehicleDto) {
    return this.vehicleRepository.create(dto);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateVehicleDto) {
    return this.vehicleRepository.updateById(id, dto);
  }

  @Delete(':id')
  async softDelete(@Param('id') id: string) {
    return this.vehicleRepository.softDeleteById(id);
  }

  @Get('paginated')
  async getPaginated(@Query('page') page: number, @Query('limit') limit: number) {
    return this.vehicleRepository.paginate(page, limit);
  }
}
```

### Soft Delete Example
```typescript
// Soft delete a vehicle
await vehicleRepository.softDeleteById('some-id');

// Find all vehicles (excludes soft-deleted by default)
const activeVehicles = await vehicleRepository.findMany();

// Find soft-deleted vehicles
const deletedVehicles = await vehicleRepository.findSoftDeleted();

// Include soft-deleted in query
const allVehicles = await vehicleRepository.findMany({
  includeSoftDeleted: true,
});

// Restore a soft-deleted vehicle
await vehicleRepository.restoreById('some-id');

// Permanently delete
await vehicleRepository.hardDeleteById('some-id');
```

## 🔧 Environment Variables

Loaded from `.env.docker` (priority) or `.env`:

```typescript
import { config } from '@shared/config';

config.database.url      // Database URL
config.backend.port      // Backend port
config.backend.apiUrl    // Backend API URL
config.environment       // NODE_ENV
```

## 📚 Key Benefits

| Feature | Benefit |
|---------|---------|
| **BaseRepository** | Instant CRUD + soft delete out of the box |
| **Type Safety** | Full TypeScript support with Prisma types |
| **Soft Delete** | Built-in soft delete functionality |
| **Pagination** | Ready-to-use pagination |
| **Flexible Queries** | Support for complex where/include/select |
| **Schema Generation** | Quick start with `-m` flag |

## 🆘 Troubleshooting

**Repository methods not available?**
- Make sure you're extending `BaseRepository<YourModel>`
- Import from `@shared/common/repository/base.repository`

**Prisma model not found?**
- Run `pnpm pmg` after creating/updating schema
- Check model name matches camelCase in repository

**Soft delete not working?**
- Ensure your Prisma model has `deletedAt DateTime?` field
- BaseRepository handles it automatically

## 📖 Examples

### Create Vehicle Module with Schema
```bash
pnpm create:module vehicle -m
```

This creates the module and a schema file at `prisma/schema/vehicles.prisma`.

Edit the schema to add your fields:
```prisma
model Vehicle {
  id           String    @id @default(uuid())
  make         String
  model        String
  year         Int
  licensePlate String    @unique @map("license_plate")
  createdAt    DateTime  @default(now()) @map("created_at")
  updatedAt    DateTime  @updatedAt @map("updated_at")
  deletedAt    DateTime? @map("deleted_at")

  @@map("vehicles")
}
```

Run migration:
```bash
pnpm pmg
```

Your repository is ready with all CRUD operations, soft delete, pagination, and more!

## 🎉 Summary

- **Simple**: `pnpm create:module vehicle`
- **With Schema**: `pnpm create:module vehicle -m`
- **BaseRepository**: All CRUD + soft delete built-in
- **Type Safe**: Uses Prisma types automatically
- **Production Ready**: Pagination, soft delete, and more

Happy coding! 🚀
