import { Module } from '@nestjs/common';
import { SharedFormFieldService } from './form-field.service';
import { FormFieldRepository } from './repository/form-field.repository';
import { PrismaModule } from '@shared/database/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [SharedFormFieldService, FormFieldRepository],
  exports: [SharedFormFieldService, FormFieldRepository],
})
export class SharedFormFieldModule {}
