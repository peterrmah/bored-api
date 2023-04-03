import "reflect-metadata";

import Logger from "./utils/logger";
import * as Loaders from "./loaders";

async function init(): Promise<void> {
  await Loaders.DatabaseConnectionLoader();
  Loaders.ExpressServerLoader();

  Logger.log(`[server] ${process.env.NODE_ENV} API Server is running on port: ${process.env.PORT}`);
}

init();
