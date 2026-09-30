import type { Turno } from "../models/turno.js";

interface FiltrosTurnos {
  especialidad?: string;
  fecha?: string;
  medicoId?: number;
}

export function filtrarTurnos(
  turnos: Turno[],
  filtros: FiltrosTurnos
): Turno[] {
  let resultado = turnos;

  if (filtros.especialidad) {
    resultado = resultado.filter(
      (turno) =>
        turno.especialidad.toLowerCase() ===
        filtros.especialidad!.toLowerCase()
    );
  }

  if (filtros.fecha) {
    resultado = resultado.filter(
      (turno) => turno.fecha === filtros.fecha
    );
  }

  if (filtros.medicoId !== undefined) {
    resultado = resultado.filter(
      (turno) => turno.medicoId === filtros.medicoId
    );
  }

  return resultado;
}

