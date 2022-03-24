import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import helmet from 'helmet';

async function bootstrap() {
  const corsOptions = {
    origin: '*',
    methods: 'GET,OPTIONS',
    maxAge: 3600,
  };

  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: corsOptions,
  });

  app.use(helmet());

  await app.listen(7500);
}
bootstrap();
