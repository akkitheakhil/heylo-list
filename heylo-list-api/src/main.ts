import { VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
const { SERVER_PORT } = process.env;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableVersioning({
    type: VersioningType.URI,
    prefix: 'api/',
    defaultVersion: '1',
  })

  const config = new DocumentBuilder()
    .setTitle('Heylo List API')
    .setDescription('This is API for heylo-list')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(SERVER_PORT || 8010, '0.0.0.0');
}
bootstrap();
