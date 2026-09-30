import type { Turno, TurnoCrudo } from "../models/turno.js";

export function normalizarTurno(crudo: TurnoCrudo): Turno | null {
  if (crudo === null || typeof crudo !== "object" || Array.isArray(crudo)) {
    return null;
  }

  const id =
    typeof crudo.id === "number" || typeof crudo.id === "string"
      ? Number(crudo.id)
      : NaN;

  const paciente =
    typeof crudo.paciente === "string" ? crudo.paciente.trim() : "";

  const documento = String(crudo.documento ?? "").trim();

  const especialidad =
    typeof crudo.especialidad === "string"
      ? crudo.especialidad.trim().toLowerCase()
      : "";

  const medicoId =
    typeof crudo.medicoId === "number" || typeof crudo.medicoId === "string"
      ? Number(crudo.medicoId)
      : NaN;

  const fechaOriginal =
    typeof crudo.fecha === "string" ? crudo.fecha.trim() : "";

  const partesFecha = fechaOriginal.match(
    /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/
  );

  const fecha = partesFecha
    ? `${partesFecha[3]}-${partesFecha[2].padStart(2, "0")}-${partesFecha[1].padStart(2, "0")}`
    : fechaOriginal;

  const fechaComoDate = new Date(`${fecha}T00:00:00Z`);

  const fechaValida =
    /^\d{4}-\d{2}-\d{2}$/.test(fecha) &&
    !Number.isNaN(fechaComoDate.getTime()) &&
    fechaComoDate.toISOString().slice(0, 10) === fecha;

  const horaOriginal =
    typeof crudo.hora === "string" ? crudo.hora.trim() : "";

  const partesHora = horaOriginal.match(/^(\d{1,2})[.:](\d{2})$/);

  const horaValida =
    partesHora !== null &&
    Number(partesHora[1]) <= 23 &&
    Number(partesHora[2]) <= 59;

  const hora = partesHora
    ? `${partesHora[1].padStart(2, "0")}:${partesHora[2]}`
    : "";

  const valorConfirmado =
    typeof crudo.confirmado === "string"
      ? crudo.confirmado.trim().toLowerCase()
      : crudo.confirmado;

  const confirmadoValido =
    valorConfirmado === true ||
    valorConfirmado === false ||
    valorConfirmado === "si" ||
    valorConfirmado === "sí" ||
    valorConfirmado === "no";

  const confirmado =
    valorConfirmado === true ||
    valorConfirmado === "si" ||
    valorConfirmado === "sí";

  if (
    !Number.isSafeInteger(id) ||
    id <= 0 ||
    !paciente ||
    !documento ||
    !especialidad ||
    !fechaValida ||
    !horaValida ||
    !confirmadoValido ||
    !Number.isSafeInteger(medicoId) ||
    medicoId <= 0
  ) {
    return null;
  }

  const turno: Turno = {
    id,
    paciente,
    documento,
    especialidad,
    fecha,
    hora,
    confirmado,
    medicoId,
  };

  if (
    typeof crudo.observaciones === "string" &&
    crudo.observaciones.trim()
  ) {
    turno.observaciones = crudo.observaciones.trim();
  }

  return turno;
}

