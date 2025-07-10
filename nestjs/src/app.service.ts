import { Injectable, OnModuleInit } from '@nestjs/common';

@Injectable()
export class AppService implements OnModuleInit {
  onModuleInit() {
    console.log("Application init...")
  }

  getHello(): string {
    return 'Welcome to nest api!';
  }
}
