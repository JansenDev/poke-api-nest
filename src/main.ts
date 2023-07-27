import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { configs } from './config/config.config';

async function bootstrap() {
  const enviroments = configs();
  const app = await NestFactory.create(AppModule, {
    cors: {
      allowedHeaders: enviroments.APP.CORS.ALLOWEDHEADERS,
      origin: enviroments.APP.CORS.ORIGIN,
    },
  });
  app.setGlobalPrefix('api/v2');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  await app.listen(enviroments.APP.PORT);
}
bootstrap();
