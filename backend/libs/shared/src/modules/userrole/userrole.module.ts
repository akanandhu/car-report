import { Module } from '@nestjs/common';
import { SharedUserroleService } from './userrole.service';
import { UserroleUtilsService } from './service/userrole.utils.service';
import { UserroleRepository } from './repository/userrole.repository';

@Module({
  providers: [SharedUserroleService, UserroleUtilsService, UserroleRepository],
  exports: [SharedUserroleService],
})
export class SharedUserroleModule {}
