import { ConnectionOptions } from "typeorm";
import config from "./config";

export default {
  type: config.TYPEORM_CONNECTION,
  host: config.TYPEORM_HOST,
  port: config.TYPEORM_PORT,
  username: config.TYPEORM_USERNAME,
  password: config.TYPEORM_PASSWORD,
  database: config.TYPEORM_DATABASE,
  entities: [config.TYPEORM_ENTITIES],
  migrations: [config.TYPEORM_MIGRATIONS],
  "cli": {
      "migrationsDir": "src/migrations"
  }
} as ConnectionOptions;
