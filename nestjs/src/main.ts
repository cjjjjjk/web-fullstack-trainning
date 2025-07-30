import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: (origin, callback) => {
      callback(null, true);
    },
    credentials: true
  });

  // Bật validation pipe cho dto
  app.useGlobalPipes(new ValidationPipe());

  const PORT = process.env.PORT ?? 3000;

  app.enableShutdownHooks();
  await app.listen(PORT, '0.0.0.0');
  console.log(`server is running on port ${PORT}`)
}
bootstrap();
