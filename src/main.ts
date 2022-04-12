import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';

async function bootstrap() {
  const corsOptions = {
    origin: '*',
    methods: 'GET,OPTIONS',
    maxAge: 3600,
  };

  const app = await NestFactory.create(AppModule, {
    cors: corsOptions,
  });

  app.use(helmet());

  await app.listen(7500);
}
bootstrap();
