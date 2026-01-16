import { Injectable } from '@nestjs/common';
import { RefreshtokenUtilsService } from './service/refreshtoken.utils.service';
import { RefreshtokenRepository } from './repository/refreshtoken.repository';

@Injectable()
export class SharedRefreshtokenService {
  constructor(
    private readonly refreshtokenUtilsService: RefreshtokenUtilsService,
    private readonly refreshtokenRepository: RefreshtokenRepository,
  ) {}
}
