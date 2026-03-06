import { Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SeederService, SeederResult } from '@shared/database/seeder/seeder.service';

@ApiTags('Seeder')
@Controller('seed')
export class SeederController {
    constructor(private readonly seederService: SeederService) { }

    @Post()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: 'Run all seeders',
        description:
            'Triggers all database seeders: roles, users, document groups, and form configuration. ' +
            'Seeders are idempotent — running them multiple times is safe.',
    })
    @ApiResponse({
        status: 200,
        description: 'Seeding result with per-seeder status',
    })
    async runSeeders(): Promise<SeederResult> {
        return this.seederService.runAll();
    }
}
