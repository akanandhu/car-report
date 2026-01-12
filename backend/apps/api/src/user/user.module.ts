import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { SharedUserModule } from '@shared/modules/user/user.module';

@Module({
  imports: [SharedUserModule],
  controllers: [UserController],
})
export class UserModule { }
