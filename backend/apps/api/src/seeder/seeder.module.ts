import { Module } from '@nestjs/common';
import { SeederController } from './seeder.controller';
import { SeederModule as SharedSeederModule } from '@shared/database/seeder/seeder.module';

@Module({
    imports: [SharedSeederModule],
    controllers: [SeederController],
})
export class SeederModule { }
