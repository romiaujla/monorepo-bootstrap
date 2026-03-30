import express, {
  type Express,
  type NextFunction,
  type Request,
  type Response,
} from "express";

import { healthRouter } from "./routes/health.js";

export const createApp = (): Express => {
  const app = express();

  app.use(express.json());
  app.use("/api/v1/health", healthRouter);

  app.use((_request: Request, response: Response) => {
    response.status(404).json({
      error: {
        code: "NOT_FOUND",
        message: "Route not found",
      },
    });
  });

  app.use(
    (
      error: unknown,
      _request: Request,
      response: Response,
      _next: NextFunction,
    ) => {
      const message =
        error instanceof Error ? error.message : "Unexpected server error";

      response.status(500).json({
        error: {
          code: "INTERNAL_SERVER_ERROR",
          message,
        },
      });
    },
  );

  return app;
};
