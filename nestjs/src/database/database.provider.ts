import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { databaseConfig } from './database.config';
import { User } from 'src/user/user.entity';


export const databaseProvider = {
    inject: [ConfigService],
    useFactory: async (config: ConfigService): Promise<TypeOrmModuleOptions> => ({
        ...databaseConfig,
        migrationsRun: true,
    }),
};
