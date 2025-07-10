import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { Logger2MiddleWare, LoggerMiddleware } from './logger/logger.middleware';

import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { databaseProvider } from './database/database.provider';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync(databaseProvider),
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
