import { NestFactory } from '@nestjs/core';
import { AppModule } from './app';
import { appConfig } from '@config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Bahr LC')
    .setDescription('The Bahr Learning Centre API description')
    .setVersion('1.0')
    .addTag('bahrlc')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(appConfig.port);
}
bootstrap();
