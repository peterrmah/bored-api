import { Connection, createConnection } from "typeorm";

import Logger from "../utils/logger";

export async function DatabaseConnectionLoader(): Promise<Connection> {
  const connection: Connection = await createConnection();
  Logger.log(`[database] connected ${connection.name}`);

  return connection;
}
