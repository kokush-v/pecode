import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CORS } from './config/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(CORS);
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api/v1');
  await app.listen(3000);
}

bootstrap();
