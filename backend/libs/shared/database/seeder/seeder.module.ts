import { Module } from '@nestjs/common';
import { SeederService } from '@shared/database/seeder/seeder.service';
import { PrismaModule } from '@shared/database/prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    providers: [SeederService],
    exports: [SeederService],
})
export class SeederModule { }
