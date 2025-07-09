import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { LoggerMiddleware } from 'src/logger/logger.middleware';

@Module({
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule { }
