import { Router } from "express";
import {
  listarTurnos,
  buscarTurno,
  crearTurno,
  actualizarTurno,
  eliminarTurno,
} from "../controllers/turnosController.js";
import { validateSchema } from "../middleware/validateSchema.js";
import { turnoSchema } from "../schemas/turnoSchema.js";

export const turnosRouter = Router();

turnosRouter.get("/", listarTurnos);
turnosRouter.get("/:id", buscarTurno);

turnosRouter.post(
  "/",
  validateSchema(turnoSchema),
  crearTurno
);

turnosRouter.put(
  "/:id",
  validateSchema(turnoSchema),
  actualizarTurno
);

turnosRouter.delete("/:id", eliminarTurno);

