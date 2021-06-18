import { Connection, createConnection, MigrationExecutor } from "typeorm";
import mainConfig from "../common/ormconfig";

const connectToDB = async (): Promise<Connection> => {
  const config = Object.assign(mainConfig, { host: "postgres" });
  
  const connection = await createConnection(config);

  const migrationExecutor = new MigrationExecutor(connection);
  await migrationExecutor.executePendingMigrations();

  return connection;
}

export default connectToDB;
