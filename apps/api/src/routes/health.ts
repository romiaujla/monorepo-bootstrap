import { HealthResponseSchema } from "@repo/types";
import { Router, type Router as ExpressRouter } from "express";

export const healthRouter: ExpressRouter = Router();

healthRouter.get("/", (_request, response) => {
  const payload = HealthResponseSchema.parse({
    status: "ok",
    timestamp: new Date().toISOString(),
  });

  response.status(200).json(payload);
});
