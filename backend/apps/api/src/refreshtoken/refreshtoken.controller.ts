import { Controller } from '@nestjs/common';
import { SharedRefreshtokenService } from '@shared/modules/refreshtoken/refreshtoken.service';
import { RefreshtokenRepository } from '@shared/modules/refreshtoken/repository/refreshtoken.repository';

@Controller('refreshtokens')
export class RefreshtokenController {
  constructor(
    private readonly sharedRefreshtokenService: SharedRefreshtokenService,
    private readonly refreshtokenRepository: RefreshtokenRepository,
  ) {}
}
