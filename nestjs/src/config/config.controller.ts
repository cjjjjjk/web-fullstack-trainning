import { Controller, Get } from '@nestjs/common';
import { ConfigService } from './config.service';

@Controller('config')
export class ConfigController {

    constructor(private configService: ConfigService) { }

    @Get()
    getConfig() {
        return this.configService.getDataConfig()
    }
}
