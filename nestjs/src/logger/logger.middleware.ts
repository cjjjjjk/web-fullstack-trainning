import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {

    console.log(`[Log] ${req.method} - ${req.originalUrl}`)
    next();
  }
}


@Injectable()
export class Logger2MiddleWare implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(`[Log2] Log2 middleware`)
    next()
  }
}