import type { NextFunction, Request, Response } from "express";
import { cargarTurnos } from "../services/cargarTurnos.js";
import { guardarTurnos } from "../services/guardarTurnos.js";
import { normalizarTurno } from "../services/normalizarTurno.js";
import { eventosTurnos } from "../services/eventosTurnos.js";
import { filtrarTurnos } from "../services/filtrarTurnos.js";
import { AppError } from "../middleware/errorHandler.js";

export async function listarTurnos(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const turnos = await cargarTurnos();

    const especialidad =
      typeof req.query.especialidad === "string"
        ? req.query.especialidad
        : undefined;

    const fecha =
      typeof req.query.fecha === "string"
        ? req.query.fecha
        : undefined;

    const medicoIdTexto =
      typeof req.query.medicoId === "string"
        ? req.query.medicoId
        : undefined;

    const medicoId =
      medicoIdTexto !== undefined
        ? Number(medicoIdTexto)
        : undefined;

    if (
      medicoId !== undefined &&
      (!Number.isSafeInteger(medicoId) || medicoId <= 0)
    ) {
      next(
        new AppError(
          400,
          "El medicoId debe ser un número positivo",
          "VALIDATION_ERROR",
          [
            {
              campo: "medicoId",
              mensaje: "El medicoId debe ser un número positivo",
            },
          ],
        ),
      );
      return;
    }

    const resultado = filtrarTurnos(turnos, {
      especialidad,
      fecha,
      medicoId,
    });

    res.status(200).json(resultado);
  } catch (error) {
    next(error);
  }
}

export async function buscarTurno(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
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

  try {
    const turnos = await cargarTurnos();
    const turno = turnos.find((item) => item.id === id);

    if (!turno) {
      next(new AppError(404, "Turno no encontrado", "NOT_FOUND"));
      return;
    }

    res.status(200).json(turno);
  } catch (error) {
    next(error);
  }
}

export async function crearTurno(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const turnos = await cargarTurnos();

    const nuevoId =
      turnos.length > 0
        ? Math.max(...turnos.map((turno) => turno.id)) + 1
        : 1;

    const nuevoTurno = normalizarTurno({
      ...req.body,
      id: nuevoId,
    });

    if (!nuevoTurno) {
      next(
        new AppError(
          400,
          "Datos del turno inválidos",
          "VALIDATION_ERROR",
        ),
      );
      return;
    }

    turnos.push(nuevoTurno);

    await guardarTurnos(turnos);

    eventosTurnos.emit("turno:creado", nuevoTurno);

    res.status(201).json(nuevoTurno);
  } catch (error) {
    next(error);
  }
}

export async function actualizarTurno(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
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

  const turnoActualizado = normalizarTurno({
    ...req.body,
    id,
  });

  if (!turnoActualizado) {
    next(
      new AppError(
        400,
        "Datos del turno inválidos",
        "VALIDATION_ERROR",
      ),
    );
    return;
  }

  try {
    const turnos = await cargarTurnos();
    const posicion = turnos.findIndex((turno) => turno.id === id);

    if (posicion === -1) {
      next(new AppError(404, "Turno no encontrado", "NOT_FOUND"));
      return;
    }

    turnos[posicion] = turnoActualizado;

    await guardarTurnos(turnos);

    eventosTurnos.emit("turno:actualizado", turnoActualizado);

    res.status(200).json(turnoActualizado);
  } catch (error) {
    next(error);
  }
}

export async function eliminarTurno(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
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

  try {
    const turnos = await cargarTurnos();
    const posicion = turnos.findIndex((turno) => turno.id === id);

    if (posicion === -1) {
      next(new AppError(404, "Turno no encontrado", "NOT_FOUND"));
      return;
    }

    const [turnoEliminado] = turnos.splice(posicion, 1);

    await guardarTurnos(turnos);

    eventosTurnos.emit("turno:eliminado", turnoEliminado);

    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

