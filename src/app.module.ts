import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { getConnectionOptions } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { configSchema } from './common/joi.config.schema';
import { UsersModule } from './resources/users/users.module';
import { BoardsModule } from './resources/boards/boards.module';
import { TasksModule } from './resources/tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './guards/auth.guard';
import { LoggingInterceptor } from './logger/logger.interceptor';
import { HttpExceptionFilter } from './filters/exception.filter';
import { getOrmConfig } from './common/orm.config';

@Module({
  imports:
  [
    ConfigModule.forRoot({
      validationSchema: configSchema,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return Object.assign(await getConnectionOptions(), getOrmConfig(configService));
      },
      inject: [ConfigService],
    }),
    UsersModule,
    BoardsModule,
    TasksModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
