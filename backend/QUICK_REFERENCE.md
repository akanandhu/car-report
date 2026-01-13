# Quick Reference - Module Creation

## 🚀 Quick Commands

```bash
# Create a new module
pnpm create:module [module-name]

# Run migration and generate Prisma Client
pnpm pmg

# Start development server
pnpm dev:api
```

## 📁 Generated Structure

When you run `pnpm create:module vehicle`:

```
✅ libs/shared/src/modules/vehicle/
   ├── vehicle.service.ts         (with repository injected)
   ├── vehicle.module.ts          (with repository in providers)
   ├── repository/
   │   └── vehicle.repository.ts  (with CRUD methods)
   ├── service/
   │   └── vehicle.utils.service.ts
   └── interface/
       └── vehicle.interface.ts

✅ apps/api/src/vehicle/
   ├── vehicle.controller.ts      (with repository injected)
   ├── vehicle.module.ts
   └── dto/
       └── vehicle.dto.ts

✅ Auto-updated:
   └── apps/api/src/api.module.ts
```

## 🎯 Complete Workflow

### 1. Create Module
```bash
pnpm create:module vehicle
```

### 2. Add to Prisma Schema
Edit `prisma/schema.prisma`:
```prisma
model Vehicle {
  id           String   @id @default(uuid())
  make         String
  model        String
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
  licensePlate: string;
}
```

### 4. Run Migration
```bash
pnpm pmg
```

### 5. Start Coding!
Repository is ready with CRUD methods ✅

## 🔧 Repository Methods

Every generated repository includes:

```typescript
✅ create(data: Partial<VehicleInterface>)
✅ findById(id: string)
✅ findAll()
✅ update(id: string, data: Partial<VehicleInterface>)
✅ delete(id: string)
```

## 💡 Usage Examples

### In Controller
```typescript
@Controller('vehicles')
export class VehicleController {
  constructor(
    private readonly sharedVehicleService: SharedVehicleService,
    private readonly vehicleRepository: VehicleRepository,
  ) {}

  @Get()
  async findAll() {
    return this.vehicleRepository.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.vehicleRepository.findById(id);
  }
}
```

### In Service
```typescript
@Injectable()
export class SharedVehicleService {
  constructor(
    private readonly vehicleRepository: VehicleRepository,
  ) {}

  async createVehicle(data: CreateVehicleDto) {
    // Business logic here
    return this.vehicleRepository.create(data);
  }
}
```

## 🎨 Naming Conventions

| Type | Example | Use Case |
|------|---------|----------|
| Module Name | `vehicle-type` | Folder/file names |
| camelCase | `vehicleType` | Variables, Prisma access |
| PascalCase | `VehicleType` | Classes, interfaces |
| snake_case | `vehicle_types` | Database tables |

## 📝 Environment Variables

```typescript
import { config } from '@shared/config';

config.database.url      // from .env.docker or .env
config.backend.port
config.backend.apiUrl
config.environment
```

`.env.docker` takes priority over `.env`

## ⚡ Key Features

| Feature | What You Get |
|---------|-------------|
| **Repository Pattern** | CRUD operations ready to use |
| **Dependency Injection** | Repository in service & controller |
| **Type Safety** | Full TypeScript support |
| **Auto Registration** | Module auto-imported in api.module |

## 🆘 Quick Troubleshooting

| Issue | Solution |
|-------|----------|
| Module not found | Check `api.module.ts` has the import |
| Prisma model error | Run `pnpm pmg` after schema changes |
| Repository error | Ensure interface matches Prisma model |

## 📚 File Locations

- **Prisma Schema:** `prisma/schema.prisma`
- **Modules:** `libs/shared/src/modules/`
- **Controllers:** `apps/api/src/`
- **Config:** `libs/shared/src/config/`

## 🎯 Pro Tips

1. ✅ **Update interface** after changing Prisma model
2. ✅ **Use repository** for all DB operations
3. ✅ **Business logic** goes in service, not controller
4. ✅ **Run `pnpm pmg`** after schema changes
5. ✅ **Add custom methods** to repository as needed

---

## 📖 Full Documentation

See `MODULE_GUIDE.md` for detailed explanations and examples.

---

**Ready to create?**

```bash
pnpm create:module my-awesome-module
```

🎉 Happy coding!
