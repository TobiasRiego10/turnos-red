import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import type { Turno, TurnoCrudo } from "../models/turno.js";
import { normalizarTurno } from "./normalizarTurno.js";

export async function cargarTurnos(): Promise<Turno[]> {
  try {
    const ruta = resolve(process.env.DATA_FILE ?? "./data/turnos.json");
    const contenido = await readFile(ruta, "utf8");
    const datos: unknown = JSON.parse(contenido);

    if (!Array.isArray(datos)) {
      throw new Error("El archivo debe contener una lista de turnos");
    }

    const turnos: Turno[] = [];
    let rechazados = 0;

    for (const dato of datos) {
      const turno = normalizarTurno(dato as TurnoCrudo);

      if (turno) {
        turnos.push(turno);
      } else {
        rechazados++;
      }
    }

    console.log(`Aceptados: ${turnos.length}. Rechazados: ${rechazados}.`);
    return turnos;
  } catch (error) {
    console.error("No se pudieron cargar los turnos:", error);
    throw error;
  }
}
