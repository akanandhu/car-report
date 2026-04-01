import { Module } from '@nestjs/common';
import { SharedClientTemplateService } from './client-template.service';
import { ClientTemplateUtilsService } from './service/client-template.utils.service';
import { ClientTemplateRepository } from './repository/client-template.repository';

@Module({
  providers: [SharedClientTemplateService, ClientTemplateUtilsService, ClientTemplateRepository],
  exports: [SharedClientTemplateService],
})
export class SharedClientTemplateModule {}
