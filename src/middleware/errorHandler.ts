import type { NextFunction, Request, Response } from "express";

export class AppError extends Error {
  status: number;
  code: string;
  details: unknown[];

  constructor(
    status: number,
    message: string,
    code: string,
    details: unknown[] = [],
  ) {
    super(message);

    this.status = status;
    this.code = code;
    this.details = details;
  }
}

export function errorHandler(
  error: unknown,
  _req: Request,
  res: Response,
  next: NextFunction,
): void {
  void next;

  if (error instanceof AppError) {
    res.status(error.status).json({
      status: error.status,
      message: error.message,
      code: error.code,
      details: error.details,
    });

    return;
  }

  console.error(error);

  res.status(500).json({
    status: 500,
    message: "Error interno del servidor",
    code: "INTERNAL_ERROR",
    details: [],
  });
}

