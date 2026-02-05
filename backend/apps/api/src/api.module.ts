import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { BranchModule } from './branch/branch.module';
import { AuthModule } from './auth/auth.module';
import { RefreshtokenModule } from './refreshtoken/refreshtoken.module';
import { VehicleModule } from './vehicle/vehicle.module';
import { DocumentGroupModule } from './document-group/document-group.module';
import { VehicleDocumentModule } from './vehicle-document/vehicle-document.module';

@Module({
  imports: [
    UserModule,
    RoleModule,
    BranchModule,
    AuthModule,
    RefreshtokenModule,
    VehicleModule,
    DocumentGroupModule,
    VehicleDocumentModule,
  ],
  controllers: [ApiController],
  providers: [ApiService],
})
export class ApiModule { }
