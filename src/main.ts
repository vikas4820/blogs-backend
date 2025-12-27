import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    //origin: 'http://localhost:4200', 
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization', 
  });

  app.use('/uploads', express.static('uploads'));

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true, 
      transform: true,
      exceptionFactory: (errors) => {
        const errorResponse = {};

        errors.forEach((error) => {
          const field = error.property; 
          if (!errorResponse[field]) {
            errorResponse[field] = [];
          }

          if (error.constraints) {
            Object.values(error.constraints).forEach((constraint) => {
              errorResponse[field].push(constraint); 
            });
          }
        });

        return {
          statusCode: 400,
          message: errorResponse,
          error: 'Bad Request',
        };
      },
    })
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
