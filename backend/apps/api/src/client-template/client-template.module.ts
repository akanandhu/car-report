import { Module } from '@nestjs/common';
import { ClientTemplateController } from './client-template.controller';
import { SharedClientTemplateModule } from '@shared/modules/client-template/client-template.module';

@Module({
  imports: [SharedClientTemplateModule],
  controllers: [ClientTemplateController],
})
export class ClientTemplateModule {}
