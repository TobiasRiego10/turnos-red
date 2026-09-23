import { Router } from "express";
import {
  listarTurnos,
  buscarTurno,
  crearTurno,
  actualizarTurno,
  eliminarTurno,
} from "../controllers/turnosController.js";

export const turnosRouter = Router();

turnosRouter.get("/", listarTurnos);
turnosRouter.get("/:id", buscarTurno);
turnosRouter.post("/", crearTurno);
turnosRouter.put("/:id", actualizarTurno);
turnosRouter.delete("/:id", eliminarTurno);
