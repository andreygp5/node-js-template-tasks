import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { configSchema } from './common/joi.config.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
    validationSchema: configSchema,
  })
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
