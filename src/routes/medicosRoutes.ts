import { Router } from "express";
import {
  obtenerMedicos,
  obtenerMedicoPorId,
  registrarMedico,
  modificarMedico,
  darDeBajaMedico,
} from "../controllers/medicosController.js";
import { validateSchema } from "../middleware/validateSchema.js";
import { medicoSchema } from "../schemas/medicoSchema.js";

const router = Router();

router.get("/", obtenerMedicos);
router.get("/:id", obtenerMedicoPorId);

router.post(
  "/",
  validateSchema(medicoSchema),
  registrarMedico
);

router.put(
  "/:id",
  validateSchema(medicoSchema),
  modificarMedico
);

router.delete("/:id", darDeBajaMedico);

export default router;

