# Propuesta de módulo: Pacientes y Turnos

## 1. Modelado de datos

El objetivo de este módulo es definir la estructura necesaria para gestionar
pacientes y permitir la asignación de turnos médicos dentro de TurnosMed.

### Paciente

La entidad Paciente representa a una persona registrada en el sistema que
puede solicitar o recibir un turno médico.

Los datos mínimos necesarios son:

- `id`: identificador único del paciente.
- `dni`: documento de identidad.
- `nombre`: nombre del paciente.
- `apellido`: apellido del paciente.
- `fechaNacimiento`: fecha de nacimiento.
- `telefono`: número de contacto.
- `email`: correo electrónico.

La interfaz propuesta en TypeScript es:

```typescript
export interface Paciente {
  id: number;
  dni: string;
  nombre: string;
  apellido: string;
  fechaNacimiento: string;
  telefono: string;
  email: string;
}
```
## 2. Endpoints RESTful propuestos

Siguiendo una organización basada en Clean Architecture, se propone separar
las responsabilidades de rutas, controladores, servicios y modelos, evitando
que la lógica de negocio quede concentrada en las rutas.

### Endpoint 1: Registrar un paciente

**Método y ruta:**

```http
POST /pacientes
```

Este endpoint permite registrar un nuevo paciente en el sistema.

**Body de ejemplo:**

```json
{
  "dni": "40123456",
  "nombre": "Juan",
  "apellido": "Pérez",
  "fechaNacimiento": "1998-05-20",
  "telefono": "3415551234",
  "email": "juan.perez@email.com"
}
```

**Respuesta exitosa:**

```json
{
  "id": 1,
  "dni": "40123456",
  "nombre": "Juan",
  "apellido": "Pérez",
  "fechaNacimiento": "1998-05-20",
  "telefono": "3415551234",
  "email": "juan.perez@email.com"
}
```

**Código HTTP:** `201 Created`

### Endpoint 2: Asignar un turno médico

**Método y ruta:**

```http
POST /turnos
```

Este endpoint permite asignar un nuevo turno médico a un paciente registrado.

**Body de ejemplo:**

```json
{
  "pacienteId": 1,
  "medicoId": 1,
  "especialidad": "Pediatría",
  "fecha": "2026-10-15",
  "hora": "10:30",
  "confirmado": false,
  "observaciones": "Primera consulta"
}
```

**Respuesta exitosa:**

```json
{
  "id": 107,
  "pacienteId": 1,
  "medicoId": 1,
  "especialidad": "Pediatría",
  "fecha": "2026-10-15",
  "hora": "10:30",
  "confirmado": false,
  "observaciones": "Primera consulta"
}
```

**Código HTTP:** `201 Created`

