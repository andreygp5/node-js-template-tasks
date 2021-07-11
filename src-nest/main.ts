import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestFastifyApplication } from '@nestjs/platform-fastify';

import swaggerUI from 'swagger-ui-express';
import path from 'path';
import YAML from 'yamljs';

import { AppModule } from './app.module';
import { createAdmin } from './helpers/createAdmin';
import { catchUncaught } from './helpers/catchUncaught';
import { isFastify } from './helpers/determinePlatform';

async function bootstrap() {
  const app = isFastify()
    ? await NestFactory.create<NestFastifyApplication>(AppModule)
    : await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  await createAdmin(app);

  const document = YAML.load(
    path.join(__dirname, '../doc/api.yaml'),
  );
  app.use('/doc', swaggerUI.serve, swaggerUI.setup(document));

  const PORT = configService.get('PORT');

  await app.listen(PORT);
}

bootstrap();

process.on('uncaughtException', (err: Error) => {
  catchUncaught(err);
});

throw new Error('OOPS');
