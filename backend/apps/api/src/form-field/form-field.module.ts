import { Module } from '@nestjs/common';
import { FormFieldController } from './form-field.controller';
import { SharedFormFieldModule } from '@shared/modules/form-field/form-field.module';

@Module({
  imports: [SharedFormFieldModule],
  controllers: [FormFieldController],
})
export class FormFieldModule {}
