import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { Logger2MiddleWare, LoggerMiddleware } from './logger/logger.middleware';

@Module({
  imports: [UserModule],
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
