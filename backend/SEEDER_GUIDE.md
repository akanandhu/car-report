# Database Seeder System

This document explains how to use the database seeder system to populate your database with initial data.

## Overview

The seeder system provides a structured way to seed your database with initial data, such as roles, default users, and other reference data.

## Commands

### Run All Seeders

To execute all seeders and populate the database:

```bash
pnpm run seed
```

This will:
1. Seed roles (super_admin, client, staff)
2. Create a super admin user with assigned role
3. Create a default branch for the super admin
4. Run any other configured seeders

### Generate a New Seeder

To create a new seeder for a specific model:

```bash
pnpm run make:seeder
```

You will be prompted to enter a model name. The system will:
1. Validate that the model exists in your Prisma schema
2. Create a new seeder file in `libs/shared/database/seeder/{model}.seeder.ts`
3. Automatically update the main seeder file to include the new seeder

**Example:**
```bash
$ pnpm run make:seeder
Enter model name: Vehicle
✅ Created seeder file: libs/shared/database/seeder/vehicle.seeder.ts
✅ Updated main seeder file
```

## Seeder Structure

### Main Seeder File

Location: `libs/shared/database/seeder/seeder.ts`

This file orchestrates all seeders and runs them in the correct order.

### Individual Seeder Files

Each model has its own seeder file that follows this structure:

```typescript
import { PrismaClient } from '@prisma/client';

export class ModelSeeder {
  static async seed(prisma: PrismaClient) {
    const data = [
      // Your seed data
    ];

    for (const item of data) {
      const existing = await prisma.model.findFirst({
        where: { /* unique field */ },
      });

      if (!existing) {
        await prisma.model.create({ data: item });
        console.log(`  ✓ Created model: ${item.name}`);
      } else {
        console.log(`  ⊗ Model already exists: ${item.name}`);
      }
    }
  }
}
```

## Default Seeders

### Role Seeder

Creates three default roles:
- **Super Admin** (`super_admin`) - Full system access
- **Client** (`client`) - Default role for registered users
- **Staff** (`staff`) - Staff member role

### User Seeder

Creates a default super admin user:
- **Email:** `superadmin@carreport.com`
- **Password:** `Admin@123`
- **Mobile:** `+1234567890`
- **Role:** super_admin
- **Default Branch:** Main Branch

## User Registration with Auto-Seeding

When a new user registers through the API, the system automatically:

1. **Creates the user account** with hashed password
2. **Assigns the 'client' role** by default (can be customized)
3. **Creates a default branch** for the user

This is handled in the `SharedUserService.register()` method.

## Best Practices

1. **Idempotent Seeders:** Always check if data exists before creating to prevent duplicates
2. **Order Matters:** Seed dependencies first (e.g., roles before users)
3. **Error Handling:** Wrap critical seeding operations in try-catch blocks
4. **Logging:** Provide clear console output for seeding success/failure
5. **Testing:** Test seeders with a fresh database to ensure they work correctly

## Example: Custom Seeder

Here's a complete example of creating a vehicle seeder:

1. **Generate the seeder:**
   ```bash
   pnpm run make:seeder
   # Enter "Vehicle" when prompted
   ```

2. **Edit the generated seeder** (`libs/shared/database/seeder/vehicle.seeder.ts`):
   ```typescript
   import { PrismaClient } from '@prisma/client';

   export class VehicleSeeder {
     static async seed(prisma: PrismaClient) {
       const vehicles = [
         { vin: 'ABC123', make: 'Toyota', model: 'Camry' },
         { vin: 'XYZ789', make: 'Honda', model: 'Civic' },
       ];

       for (const vehicle of vehicles) {
         const existing = await prisma.vehicle.findFirst({
           where: { vin: vehicle.vin },
         });

         if (!existing) {
           await prisma.vehicle.create({ data: vehicle });
           console.log(`  ✓ Created vehicle: ${vehicle.make} ${vehicle.model}`);
         } else {
           console.log(`  ⊗ Vehicle already exists: ${vehicle.vin}`);
         }
       }
     }
   }
   ```

3. **Run the seeder:**
   ```bash
   pnpm run seed
   ```

## Troubleshooting

### "Model does not exist in Prisma schema"

Make sure:
1. The model is defined in `prisma/schema.prisma`
2. You've run `pnpm prisma generate` after creating the model
3. The model name matches exactly (case-sensitive)

### Seeder Import Errors

If you see module import errors:
1. Run `pnpm prisma generate` to regenerate the Prisma Client
2. Restart your TypeScript server
3. Verify the import paths in your seeder files

### Database Connection Issues

Ensure:
1. Your `.env` file has the correct `DATABASE_URL`
2. The database is running and accessible
3. You have the necessary permissions

## Repository Provider System

All modules now use a centralized repository provider system:

**Location:** `libs/shared/src/common/providers/repository.providers.ts`

This file exports `REPOSITORY_PROVIDERS` which includes all repository classes. Import it in your module:

```typescript
import { REPOSITORY_PROVIDERS } from '@shared/common/providers/repository.providers';

@Module({
  imports: [PrismaModule],
  providers: [YourService, ...REPOSITORY_PROVIDERS],
})
export class YourModule {}
```

This eliminates the need to import repositories individually in each module.
