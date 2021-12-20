import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NotFoundExceptionFilter } from './filters/entity-not-found-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      errorHttpStatusCode: 422,
      disableErrorMessages: true,
    }),
  );
  app.useGlobalFilters(new NotFoundExceptionFilter());
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
