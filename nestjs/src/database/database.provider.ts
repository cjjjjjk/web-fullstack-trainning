import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { databaseConfig } from './database.config';

export const databaseProvider = {
    inject: [ConfigService],
    useFactory: async (): Promise<TypeOrmModuleOptions> => ({
        ...databaseConfig,
        migrationsRun: true
    }),
};