import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppConfigService } from './app-config/app-config.service';
import { AppModule } from './app.module';

const logger = new Logger('Moist Central');

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());

  const configService = app.get(AppConfigService);

  const host = configService.get('HOST');
  const port = configService.get('PORT');
  const apiPrefix = configService.get('API_PREFIX');
  const docsPath = configService.get('DOCS_PATH');

  app.setGlobalPrefix(apiPrefix);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
      stopAtFirstError: false,
    }),
  );

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Moist Central')
    .setDescription('API documentation for Moist Central.')
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig, {
    operationIdFactory: (_controllerKey: string, methodKey: string) => methodKey,
  });

  SwaggerModule.setup(docsPath, app, swaggerDocument, {
    swaggerOptions: {
      defaultModelsExpandDepth: 3,
    },
  });

  await app.listen(port, host, (err, address) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }

    logger.log(`Moist Central server listening at ${address}`);
  });
}

bootstrap();
