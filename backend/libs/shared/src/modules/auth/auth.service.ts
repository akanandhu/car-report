import { Injectable } from '@nestjs/common';
import { AuthUtilsService } from './service/auth.utils.service';
import { AuthRepository } from './repository/auth.repository';

@Injectable()
export class SharedAuthService {
  constructor(
    private readonly authUtilsService: AuthUtilsService,
    private readonly authRepository: AuthRepository,
  ) {}
}
