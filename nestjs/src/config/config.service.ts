import { Injectable } from '@nestjs/common';
import { AppDataConfig } from './config';

@Injectable()
export class ConfigService {

    constructor() { }

    getDataConfig = function () {
        return AppDataConfig
    }
}
