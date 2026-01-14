import { Injectable } from '@nestjs/common';
import { UserroleUtilsService } from './service/userrole.utils.service';
import { UserroleRepository } from './repository/userrole.repository';

@Injectable()
export class SharedUserroleService {
  constructor(
    private readonly userroleUtilsService: UserroleUtilsService,
    private readonly userroleRepository: UserroleRepository,
  ) {}
}
