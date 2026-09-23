import type { Request, Response } from "express";
import { cargarTurnos } from "../services/cargarTurnos.js";
import { guardarTurnos } from "../services/guardarTurnos.js";
import { normalizarTurno } from "../services/normalizarTurno.js";
import { eventosTurnos } from "../services/eventosTurnos.js";

export async function listarTurnos(
  _req: Request,
  res: Response,
): Promise<void> {
  try {
    const turnos = await cargarTurnos();
    res.json(turnos);
  } catch {
    res.status(500).json({ error: "No se pudieron cargar los turnos" });
  }
}

export async function buscarTurno(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);

  if (!Number.isSafeInteger(id) || id <= 0) {
    res.status(400).json({ error: "El ID debe ser un número positivo" });
    return;
  }

  try {
    const turnos = await cargarTurnos();
    const turno = turnos.find((item) => item.id === id);

    if (!turno) {
      res.status(404).json({ error: "Turno no encontrado" });
      return;
    }

    res.json(turno);
  } catch {
    res.status(500).json({ error: "No se pudieron cargar los turnos" });
  }
}

export async function crearTurno(req: Request, res: Response): Promise<void> {
  const nuevoTurno = normalizarTurno(req.body);

  if (!nuevoTurno) {
    res.status(400).json({ error: "Datos del turno inválidos" });
    return;
  }

  try {
    const turnos = await cargarTurnos();

    if (turnos.some((turno) => turno.id === nuevoTurno.id)) {
      res.status(400).json({ error: "Ya existe un turno con ese ID" });
      return;
    }

    turnos.push(nuevoTurno);
    await guardarTurnos(turnos);
    eventosTurnos.emit("turno:creado", nuevoTurno);
    res.status(201).json(nuevoTurno);
  } catch {
    res.status(500).json({ error: "No se pudo guardar el turno" });
  }
}

export async function actualizarTurno(
  req: Request,
  res: Response,
): Promise<void> {
  const id = Number(req.params.id);

  if (!Number.isSafeInteger(id) || id <= 0) {
    res.status(400).json({ error: "El ID debe ser un número positivo" });
    return;
  }

  const turnoActualizado = normalizarTurno({ ...req.body, id });

  if (!turnoActualizado) {
    res.status(400).json({ error: "Datos del turno inválidos" });
    return;
  }

  try {
    const turnos = await cargarTurnos();
    const posicion = turnos.findIndex((turno) => turno.id === id);

    if (posicion === -1) {
      res.status(404).json({ error: "Turno no encontrado" });
      return;
    }

    turnos[posicion] = turnoActualizado;
    await guardarTurnos(turnos);
    eventosTurnos.emit("turno:actualizado", turnoActualizado);
    res.json(turnoActualizado);
  } catch {
    res.status(500).json({ error: "No se pudo actualizar el turno" });
  }
}

export async function eliminarTurno(
  req: Request,
  res: Response,
): Promise<void> {
  const id = Number(req.params.id);

  if (!Number.isSafeInteger(id) || id <= 0) {
    res.status(400).json({ error: "El ID debe ser un número positivo" });
    return;
  }

  try {
    const turnos = await cargarTurnos();
    const posicion = turnos.findIndex((turno) => turno.id === id);

    if (posicion === -1) {
      res.status(404).json({ error: "Turno no encontrado" });
      return;
    }

    const [turnoEliminado] = turnos.splice(posicion, 1);
    await guardarTurnos(turnos);
    eventosTurnos.emit("turno:eliminado", turnoEliminado);
    res.json(turnoEliminado);
  } catch {
    res.status(500).json({ error: "No se pudo eliminar el turno" });
  }
}
