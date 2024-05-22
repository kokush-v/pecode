import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CORS } from './config/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(CORS);
  app.setGlobalPrefix('api/v1');
  await app.listen(3000);
}

bootstrap();
