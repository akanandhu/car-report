import { Controller, UseGuards } from '@nestjs/common';
import { SharedRefreshtokenService } from '@shared/modules/refreshtoken/refreshtoken.service';
import { RefreshtokenRepository } from '@shared/modules/refreshtoken/repository/refreshtoken.repository';
import { JwtAuthGuard } from '@shared/modules/auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('refreshtokens')
export class RefreshtokenController {
  constructor(
    private readonly sharedRefreshtokenService: SharedRefreshtokenService,
    private readonly refreshtokenRepository: RefreshtokenRepository,
  ) {}
}
