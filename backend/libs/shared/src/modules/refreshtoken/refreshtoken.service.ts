import { Injectable } from '@nestjs/common';
import { RefreshtokenRepository } from './repository/refreshtoken.repository';

@Injectable()
export class SharedRefreshtokenService {
  constructor(
    private readonly refreshtokenRepository: RefreshtokenRepository,
  ) {}
}
