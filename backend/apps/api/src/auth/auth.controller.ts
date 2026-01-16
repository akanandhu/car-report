import { Controller } from '@nestjs/common';
import { SharedAuthService } from '@shared/modules/auth/auth.service';
import { AuthRepository } from '@shared/modules/auth/repository/auth.repository';

@Controller('auths')
export class AuthController {
  constructor(
    private readonly sharedAuthService: SharedAuthService,
    private readonly authRepository: AuthRepository,
  ) {}
}
