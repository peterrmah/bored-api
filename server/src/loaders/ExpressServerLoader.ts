import { Application } from "express";
import { createExpressServer } from "routing-controllers";

import * as Controllers from "../api/controllers";

export function ExpressServerLoader(): Application {
  const expressApp: Application = createExpressServer({
    cors: true,
    classTransformer: true,
    routePrefix: "/api",
    middlewares: [],
    controllers: Object.values(Controllers),
    validation: true,
    defaultErrorHandler: true,
    defaults: {
      // With this option, null will return 404 by default
      nullResultCode: 404,

      // With this option, void or Promise<void> will return 204 by default
      undefinedResultCode: 204,

      paramOptions: {
        // With this option, argument will be required by default
        required: true,
      },
    },
  });

  expressApp.listen(process.env.PORT);

  return expressApp;
}
