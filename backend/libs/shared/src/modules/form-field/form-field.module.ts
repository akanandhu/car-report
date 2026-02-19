import { Module } from '@nestjs/common';
import { SharedFormFieldService } from './form-field.service';
import { FormFieldUtilsService } from './service/form-field.utils.service';
import { FormFieldRepository } from './repository/form-field.repository';
import { PrismaModule } from '@shared/database/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [SharedFormFieldService, FormFieldUtilsService, FormFieldRepository],
  exports: [SharedFormFieldService, FormFieldRepository],
})
export class SharedFormFieldModule { }
