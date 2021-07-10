import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestFastifyApplication } from '@nestjs/platform-fastify';

import swaggerUI from 'swagger-ui-express';
import path from 'path';
import YAML from 'yamljs';

import { AppModule } from './app.module';

const isFastify = (): boolean => {
  const { env } = process;
  const { USE_FASTIFY } = env;

  return !!USE_FASTIFY;
};

async function bootstrap() {
  const app = isFastify()
    ? await NestFactory.create<NestFastifyApplication>(AppModule)
    : await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  const document = YAML.load(
    path.join(__dirname, '../doc/api.yaml'),
  );
  app.use('/doc', swaggerUI.serve, swaggerUI.setup(document));

  const PORT = configService.get('PORT');

  await app.listen(PORT);
}

bootstrap();
