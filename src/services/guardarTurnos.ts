import { writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import type { Turno } from "../models/turno.js";

export async function guardarTurnos(turnos: Turno[]): Promise<void> {
  const ruta = resolve(process.env.DATA_FILE ?? "./data/turnos.json");
  const contenido = JSON.stringify(turnos, null, 2);

  await writeFile(ruta, contenido, "utf8");
}
