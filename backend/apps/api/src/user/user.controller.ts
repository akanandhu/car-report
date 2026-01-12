import { Controller } from '@nestjs/common';
import { SharedUserService } from '@shared/modules/user/user.service';

@Controller('users')
export class UserController {
  constructor(private readonly sharedUserService: SharedUserService) { }
}
