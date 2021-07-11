import { ConfigService } from '@nestjs/config';
import { ConnectionOptions } from 'typeorm';

export const getOrmConfig = (configService: ConfigService): ConnectionOptions => {
  return {
    type: configService.get<string>('TYPEORM_CONNECTION') || 'postgres',
    host: configService.get<string>('TYPEORM_HOST') || 'localhost',
    port: configService.get<number>('TYPEORM_PORT') || 5432,
    username: configService.get<string>('TYPEORM_USERNAME') || 'postgres',
    password: configService.get<string>('TYPEORM_PASSWORD') || 'postgres',
    database: configService.get<string>('TYPEORM_DATABASE') || 'postgres',
    entities: [configService.get<string>('TYPEORM_ENTITIES') || ''],
    migrations: [configService.get<string>('TYPEORM_MIGRATIONS') || ''],
    migrationsRun: true,
    cli: {
      migrationsDir: 'src/migrations',
    },
  } as ConnectionOptions;
};
