import { HTTPException } from "hono/http-exception";
import { HTTPResponseError } from "hono/types";
import { StatusCode } from "hono/utils/http-status";

import { AppContext } from "@/common/types";

export class AppError extends Error {
  constructor(message: string, public statusCode: StatusCode) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class BadRequestError extends AppError {
  constructor(message: string) {
    super(message, 400);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string) {
    super(message, 401);
  }
}

export class InternalServerError extends AppError {
  constructor(message: string) {
    super(message, 500);
  }
}

export function onError(
  err: AppError | Error | HTTPResponseError,
  c: AppContext
) {
  err instanceof AppError ? c.status(err.statusCode) : c.status(500);
  return c.json({
    message: err.message,
  });
}
