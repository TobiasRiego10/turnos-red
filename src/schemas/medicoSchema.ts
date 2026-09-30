import { z } from "zod";

export const medicoSchema = z.object({
  id: z.number().int().positive().optional(),
  nombre: z.string().min(1, "El nombre es obligatorio"),
  especialidad: z.enum([
    "Clínica médica",
    "Pediatría",
    "Odontología",
    "Nutrición",
  ]),
  matricula: z.string().min(1, "La matrícula es obligatoria"),
  disponible: z.boolean(),
});

