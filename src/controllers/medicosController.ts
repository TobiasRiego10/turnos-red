import type { NextFunction, Request, Response } from "express";
import {
  listarMedicos,
  buscarMedicoPorId,
  crearMedico,
  actualizarMedico,
  eliminarMedico,
} from "../services/medicosService.js";
import { AppError } from "../middleware/errorHandler.js";

export async function obtenerMedicos(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const especialidad =
      typeof req.query.especialidad === "string"
        ? req.query.especialidad
        : undefined;

    const disponible =
      req.query.disponible === "true"
        ? true
        : req.query.disponible === "false"
          ? false
          : undefined;

    const medicos = listarMedicos(especialidad, disponible);

    res.status(200).json(medicos);
    return;
  } catch (error) {
    next(error);
  }
}

export async function obtenerMedicoPorId(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const id = Number(req.params.id);

    if (!Number.isSafeInteger(id) || id <= 0) {
      next(
        new AppError(
          400,
          "El ID debe ser un número positivo",
          "VALIDATION_ERROR",
          [
            {
              campo: "id",
              mensaje: "El ID debe ser un número positivo",
            },
          ],
        ),
      );
      return;
    }

    const medico = buscarMedicoPorId(id);

    if (!medico) {
      next(new AppError(404, "Médico no encontrado", "NOT_FOUND"));
      return;
    }

    res.status(200).json(medico);
    return;
  } catch (error) {
    next(error);
  }
}

export async function registrarMedico(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const nuevoMedico = crearMedico(req.body);

    res.status(201).json(nuevoMedico);
    return;
  } catch (error) {
    next(error);
  }
}

export async function modificarMedico(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const id = Number(req.params.id);

    if (!Number.isSafeInteger(id) || id <= 0) {
      next(
        new AppError(
          400,
          "El ID debe ser un número positivo",
          "VALIDATION_ERROR",
          [
            {
              campo: "id",
              mensaje: "El ID debe ser un número positivo",
            },
          ],
        ),
      );
      return;
    }

    const medicoActualizado = actualizarMedico(id, req.body);

    if (!medicoActualizado) {
      next(new AppError(404, "Médico no encontrado", "NOT_FOUND"));
      return;
    }

    res.status(200).json(medicoActualizado);
    return;
  } catch (error) {
    next(error);
  }
}

export async function darDeBajaMedico(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const id = Number(req.params.id);

    if (!Number.isSafeInteger(id) || id <= 0) {
      next(
        new AppError(
          400,
          "El ID debe ser un número positivo",
          "VALIDATION_ERROR",
          [
            {
              campo: "id",
              mensaje: "El ID debe ser un número positivo",
            },
          ],
        ),
      );
      return;
    }

    const eliminado = eliminarMedico(id);

    if (!eliminado) {
      next(new AppError(404, "Médico no encontrado", "NOT_FOUND"));
      return;
    }

    res.status(204).send();
    return;
  } catch (error) {
    next(error);
  }
}

