import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { configSchema } from './common/joi.config.schema';
import { UsersModule } from './resources/users/users.module';

@Module({
  imports:
  [
    ConfigModule.forRoot({
      validationSchema: configSchema,
    }),
    TypeOrmModule.forRoot(),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}