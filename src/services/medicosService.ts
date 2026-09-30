import type { Medico } from "../models/medico.js";

const medicos: Medico[] = [
  {
    id: 1,
    nombre: "Ana López",
    especialidad: "Pediatría",
    matricula: "MP-1001",
    disponible: true,
  },
  {
    id: 2,
    nombre: "Carlos Gómez",
    especialidad: "Odontología",
    matricula: "MP-1002",
    disponible: false,
  },
];

export function listarMedicos(
  especialidad?: string,
  disponible?: boolean,
): Medico[] {
  let resultado = medicos;

  if (especialidad) {
    resultado = resultado.filter(
      (medico) =>
        medico.especialidad.toLowerCase() === especialidad.toLowerCase(),
    );
  }

  if (disponible !== undefined) {
    resultado = resultado.filter(
      (medico) => medico.disponible === disponible,
    );
  }

  return resultado;
}

export function buscarMedicoPorId(id: number): Medico | undefined {
  return medicos.find((medico) => medico.id === id);
}

export function crearMedico(datos: Omit<Medico, "id">): Medico {
  const nuevoMedico: Medico = {
    id:
      medicos.length > 0
        ? Math.max(...medicos.map((medico) => medico.id)) + 1
        : 1,
    ...datos,
  };

  medicos.push(nuevoMedico);

  return nuevoMedico;
}

export function actualizarMedico(
  id: number,
  datos: Omit<Medico, "id">,
): Medico | undefined {
  const indice = medicos.findIndex((medico) => medico.id === id);

  if (indice === -1) {
    return undefined;
  }

  const medicoActualizado: Medico = {
    id,
    ...datos,
  };

  medicos[indice] = medicoActualizado;

  return medicoActualizado;
}

export function eliminarMedico(id: number): boolean {
  const indice = medicos.findIndex((medico) => medico.id === id);

  if (indice === -1) {
    return false;
  }

  medicos.splice(indice, 1);

  return true;
}

