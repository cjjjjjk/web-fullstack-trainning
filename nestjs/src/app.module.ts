import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { Logger2MiddleWare, LoggerMiddleware } from './logger/logger.middleware';

import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: config.get<string>('DB_USERNAME'),
        password: config.get<string>('DB_PASSWORD'),
        database: 'nestdb',
        entities: [User],
        synchronize: true,
      }),
    }),
    UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes("user");
    // Có thể triển khai nhiều middleware
    consumer.apply(Logger2MiddleWare).forRoutes(

      // Áp dụng cho nhiều method khác nhau
      { path: "user", method: RequestMethod.GET },
      { path: "user", method: RequestMethod.POST },
      { path: "user", method: RequestMethod.PATCH },
    )
  }
}
