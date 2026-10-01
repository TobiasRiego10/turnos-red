import type { Request, Response } from "express";

export async function bienvenida(
  req: Request,
  res: Response,
): Promise<void> {
  const status = 200;

  res.status(status).json({
    message: "API TurnosMed funcionando correctamente",
  });
  return;
}

export async function rutaNoEncontrada(
  req: Request,
  res: Response,
): Promise<void> {
  const status = 404;

  res.status(status).json({
    status,
    message: "Ruta no encontrada",
    code: "NOT_FOUND",
  });
  return;
}

