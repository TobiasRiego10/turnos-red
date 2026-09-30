import type { Request, Response, NextFunction } from "express";
import type { ZodType } from "zod";

export function validateSchema(schema: ZodType) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const resultado = schema.safeParse(req.body);

    if (!resultado.success) {
      res.status(400).json({
        status: 400,
        message: "Error de validación en los datos ingresados",
        code: "VALIDATION_ERROR",
        details: resultado.error.issues.map((issue) => ({
          campo: issue.path.join("."),
          mensaje: issue.message,
        })),
      });
      return;
    }

    req.body = resultado.data;
    next();
  };
}

