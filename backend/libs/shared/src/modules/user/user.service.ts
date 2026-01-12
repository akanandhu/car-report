import { Injectable } from '@nestjs/common';
import { UserUtilsService } from './service/user.utils.service';

@Injectable()
export class SharedUserService {
  constructor(private readonly userUtilsService: UserUtilsService) {}
}
