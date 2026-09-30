import { z } from "zod";

export const turnoSchema = z.object({
  id: z.number().int().positive().optional(),

  paciente: z
    .string()
    .min(1, "El paciente es obligatorio"),

  documento: z
    .string()
    .min(1, "El documento es obligatorio"),

  especialidad: z.enum([
    "Clínica médica",
    "Pediatría",
    "Odontología",
    "Nutrición",
  ]),

  fecha: z
    .string()
    .min(1, "La fecha es obligatoria"),

  hora: z
    .string()
    .min(1, "La hora es obligatoria"),

  confirmado: z.boolean(),

  observaciones: z.string().optional(),

  medicoId: z
    .number()
    .int()
    .positive(),
});

