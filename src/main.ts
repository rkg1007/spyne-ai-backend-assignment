import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ErrorHandler } from './common/middlewares/error-handler.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new ErrorHandler());
  await app.listen(3000);
}
bootstrap();
