# TurnosRed

API RESTful para la gestión de turnos médicos y profesionales, desarrollada con Node.js, Express y TypeScript.

Esta segunda versión incorpora validaciones con Zod, gestión del recurso Médico, filtros mediante Query Parameters, manejo estandarizado de errores y pruebas automatizadas con Postman.

## Tecnologías utilizadas

- Node.js
- TypeScript
- Express
- Zod
- Postman
- Git / GitHub

## Requisitos

- Node.js 24.21.0
- npm

## Instalación

Instalar las dependencias del proyecto:

```powershell
npm ci
```

Copiar `.env.example` a `.env`:

```powershell
Copy-Item .env.example .env
```

## Variables de entorno

| Variable | Descripción | Ejemplo |
| --- | --- | --- |
| `PORT` | Puerto utilizado por el servidor | `3000` |
| `DATA_FILE` | Ruta del archivo JSON de turnos | `./data/turnos.json` |

Ejemplo de `.env`:

```env
PORT=3000
DATA_FILE=./data/turnos.json
```

## Ejecución
### Ejecución en desarrollo

Para ejecutar el proyecto directamente en modo desarrollo:

```powershell
npm run dev
```

Este comando utiliza `tsx` para ejecutar `src/server.ts` y reinicia automáticamente el servidor cuando se detectan cambios en el código fuente.

### Ejecución compilada
Compilar el proyecto:

```powershell
npm run build
```

Iniciar el servidor:

```powershell
npm start
```

La API estará disponible en:

```text
http://localhost:3000
```

## Comandos

- `npm run dev`: inicia el servidor en modo desarrollo utilizando tsx.
- `npm run build`: compila TypeScript y genera los archivos JavaScript en `dist/`.
- `npm start`: inicia el servidor compilado.
- `npm run lint`: analiza los archivos TypeScript con ESLint.
- `npm run format`: formatea el código utilizando Prettier.

## Estructura del proyecto

```text
turnos-red/
├── data/
│   └── turnos.json
├── public/
│   └── monitor.html
├── src/
│   ├── controllers/
│   │   ├── turnosController.ts
│   │   └── medicosController.ts
│   ├── middleware/
│   │   ├── errorHandler.ts
│   │   └── validateSchema.ts
│   ├── models/
│   │   ├── turno.ts
│   │   └── medico.ts
│   ├── routes/
│   │   ├── turnosRoutes.ts
│   │   └── medicosRoutes.ts
│   ├── schemas/
│   │   ├── turnoSchema.ts
│   │   └── medicoSchema.ts
│   ├── services/
│   │   ├── cargarTurnos.ts
│   │   ├── guardarTurnos.ts
│   │   ├── normalizarTurno.ts
│   │   ├── filtrarTurnos.ts
│   │   ├── medicosService.ts
│   │   └── eventosTurnos.ts
│   └── server.ts
├── .env.example
├── package.json
├── README.md
├── turnos-red.postman_collection.json
└── tsconfig.json
```

## API de Turnos

| Método | Endpoint | Descripción |
| --- | --- | --- |
| GET | `/turnos` | Lista los turnos |
| GET | `/turnos/:id` | Busca un turno por ID |
| POST | `/turnos` | Crea un nuevo turno |
| PUT | `/turnos/:id` | Actualiza un turno |
| DELETE | `/turnos/:id` | Elimina un turno |

### GET /turnos

Obtiene la lista de turnos registrados.

**Query Params opcionales:**

- `especialidad`: filtra los turnos por especialidad.
- `fecha`: filtra los turnos por fecha.
- `medicoId`: filtra los turnos por médico. Debe ser un número entero positivo.

**Respuestas:**

- `200 OK`: devuelve la lista de turnos.
- `400 Bad Request`: `medicoId` no es un número entero positivo.
- `500 Internal Server Error`: error interno del servidor.

### GET /turnos/:id

Obtiene un turno específico mediante su identificador.

**Params:**

- `id`: identificador del turno. Debe ser un número entero positivo.

**Respuestas:**

- `200 OK`: devuelve el turno encontrado.
- `400 Bad Request`: el ID ingresado no es válido.
- `404 Not Found`: no existe un turno con ese ID.
- `500 Internal Server Error`: error interno del servidor.

### POST /turnos

Crea un nuevo turno. El ID es generado automáticamente por la API.

**Body JSON:**

```json
{
  "paciente": "Juan Perez",
  "documento": "40123456",
  "especialidad": "Pediatría",
  "fecha": "2026-10-10",
  "hora": "09:30",
  "confirmado": true,
  "observaciones": "Primera consulta",
  "medicoId": 1
}
```

El campo `observaciones` es opcional.

**Respuestas:**

- `201 Created`: turno creado correctamente.
- `400 Bad Request`: los datos enviados no cumplen con el esquema de validación.
- `500 Internal Server Error`: error interno del servidor.

### PUT /turnos/:id

Actualiza un turno existente.

**Params:**

- `id`: identificador del turno que se desea actualizar. Debe ser un número entero positivo.

**Body JSON:**

```json
{
  "paciente": "Juan Perez",
  "documento": "40123456",
  "especialidad": "Pediatría",
  "fecha": "2026-10-11",
  "hora": "10:00",
  "confirmado": true,
  "observaciones": "Control médico",
  "medicoId": 1
}
```

**Respuestas:**

- `200 OK`: turno actualizado correctamente.
- `400 Bad Request`: ID o datos del turno inválidos.
- `404 Not Found`: no existe un turno con ese ID.
- `500 Internal Server Error`: error interno del servidor.

### DELETE /turnos/:id

Elimina un turno existente.

**Params:**

- `id`: identificador del turno que se desea eliminar. Debe ser un número entero positivo.

**Respuestas:**

- `204 No Content`: turno eliminado correctamente.
- `400 Bad Request`: el ID ingresado no es válido.
- `404 Not Found`: no existe un turno con ese ID.
- `500 Internal Server Error`: error interno del servidor.

### Ejemplo para crear un turno

```json
{
  "paciente": "Juan Perez",
  "documento": "40123456",
  "especialidad": "Pediatría",
  "fecha": "2026-10-10",
  "hora": "09:30",
  "confirmado": true,
  "medicoId": 1
}
```

El identificador del turno es generado por la API.

## API de Médicos

| Método | Endpoint | Descripción |
| --- | --- | --- |
| GET | `/medicos` | Lista todos los médicos |
| GET | `/medicos/:id` | Busca un médico por ID |
| POST | `/medicos` | Registra un nuevo médico |
| PUT | `/medicos/:id` | Actualiza un médico |
| DELETE | `/medicos/:id` | Elimina un médico |

### GET /medicos

Obtiene la lista de médicos registrados.

**Query Params opcionales:**

- `especialidad`: filtra los médicos por especialidad.
- `disponible`: filtra los médicos según su disponibilidad utilizando `true` o `false`.

**Respuestas:**

- `200 OK`: devuelve la lista de médicos.
- `500 Internal Server Error`: error interno del servidor.

### GET /medicos/:id

Obtiene un médico específico mediante su identificador.

**Params:**

- `id`: identificador del médico. Debe ser un número entero positivo.

**Respuestas:**

- `200 OK`: devuelve el médico encontrado.
- `400 Bad Request`: el ID ingresado no es válido.
- `404 Not Found`: no existe un médico con ese ID.
- `500 Internal Server Error`: error interno del servidor.

### POST /medicos

Registra un nuevo médico en el sistema.

**Body JSON:**

```json
{
  "nombre": "Laura Martínez",
  "especialidad": "Nutrición",
  "matricula": "MP-2001",
  "disponible": true
}
```

El identificador es generado automáticamente por la aplicación.

**Respuestas:**

- `201 Created`: médico registrado correctamente.
- `400 Bad Request`: los datos enviados no cumplen con el esquema de validación.
- `500 Internal Server Error`: error interno del servidor.

### PUT /medicos/:id

Actualiza los datos de un médico existente.

**Params:**

- `id`: identificador del médico que se desea actualizar. Debe ser un número entero positivo.

**Body JSON:**

```json
{
  "nombre": "Laura Martínez",
  "especialidad": "Nutrición",
  "matricula": "MP-2001",
  "disponible": false
}
```

**Respuestas:**

- `200 OK`: médico actualizado correctamente.
- `400 Bad Request`: el ID o los datos enviados no son válidos.
- `404 Not Found`: no existe un médico con ese ID.
- `500 Internal Server Error`: error interno del servidor.

### DELETE /medicos/:id

Elimina un médico existente.

**Params:**

- `id`: identificador del médico que se desea eliminar. Debe ser un número entero positivo.

**Respuestas:**

- `204 No Content`: médico eliminado correctamente.
- `400 Bad Request`: el ID ingresado no es válido.
- `404 Not Found`: no existe un médico con ese ID.
- `500 Internal Server Error`: error interno del servidor.

### Ejemplo para crear un médico

```json
{
  "nombre": "Laura Martínez",
  "especialidad": "Nutrición",
  "matricula": "MP-2001",
  "disponible": true
}
```

## Validación con Zod

Los cuerpos enviados para crear o actualizar Turnos y Médicos son validados mediante Zod antes de llegar a la lógica principal de los controladores.

El campo `documento` se maneja como `string`.

Las especialidades admitidas son:

- `Clínica médica`
- `Pediatría`
- `Odontología`
- `Nutrición`

En los turnos, `medicoId` debe ser un número entero positivo.

Cuando los datos no cumplen con el esquema esperado, la API responde con `400 Bad Request`.

Ejemplo:

```json
{
  "status": 400,
  "message": "Error de validación en los datos ingresados",
  "code": "VALIDATION_ERROR",
  "details": [
    {
      "campo": "paciente",
      "mensaje": "El paciente es obligatorio"
    }
  ]
}
```

El arreglo `details` permite identificar exactamente qué campos no superaron la validación.

## Manejo estandarizado de errores

La API utiliza una estructura uniforme para las respuestas fallidas.

Ejemplo de un recurso inexistente:

```json
{
  "status": 404,
  "message": "Turno no encontrado",
  "code": "NOT_FOUND",
  "details": []
}
```

Los principales códigos HTTP utilizados son:

- `200 OK`: operación realizada correctamente.
- `201 Created`: recurso creado correctamente.
- `204 No Content`: recurso eliminado correctamente.
- `400 Bad Request`: datos o parámetros inválidos.
- `404 Not Found`: recurso no encontrado.
- `500 Internal Server Error`: error interno del servidor.

Los errores de la aplicación son gestionados mediante un middleware centralizado.

## Query Parameters

Los filtros se implementan sobre los endpoints existentes sin crear rutas adicionales.

### Filtros de Turnos

Filtrar por especialidad:

```text
GET /turnos?especialidad=pediatría
```

Filtrar por fecha:

```text
GET /turnos?fecha=2026-09-25
```

Filtrar por médico:

```text
GET /turnos?medicoId=1
```

Los filtros también pueden combinarse. Por ejemplo:

```text
GET /turnos?especialidad=pediatría&fecha=2026-08-14&medicoId=1
```

### Filtros de Médicos

Filtrar por especialidad:

```text
GET /medicos?especialidad=Pediatría
```

Filtrar por disponibilidad:

```text
GET /medicos?disponible=false
```

También pueden combinarse:

```text
GET /medicos?especialidad=Pediatría&disponible=true
```

## Postman

Se creó una colección de Postman para probar los endpoints de TurnosRed.

La colección utiliza el environment `TurnosRed Local` con variables como:

| Variable | Descripción |
| --- | --- |
| `baseUrl` | URL base de la API |
| `turnoId` | ID dinámico de un turno creado durante las pruebas |
| `medicoId` | ID dinámico de un médico creado durante las pruebas |

La URL base utilizada localmente es:

```text
http://localhost:3000
```

Las requests pueden utilizarla de la siguiente manera:

```text
{{baseUrl}}/turnos
```

La colección contiene pruebas automatizadas en JavaScript para verificar:

- códigos de estado HTTP;
- respuestas JSON;
- estructura de los recursos;
- creación correcta de recursos;
- casos `400 Bad Request`;
- casos `404 Not Found`;
- funcionamiento de los filtros mediante Query Parameters.

También se guardaron respuestas de ejemplo y se utilizó un Mock Server para simular respuestas de la API durante las pruebas.

La colección se exporta como:

```text
turnos-red.postman_collection.json
```

## Pruebas realizadas

Durante el desarrollo se probaron los siguientes escenarios:

- listado de turnos;
- búsqueda de turnos por ID;
- creación de turnos;
- actualización de turnos;
- eliminación de turnos;
- listado de médicos;
- búsqueda de médicos por ID;
- creación de médicos;
- actualización de médicos;
- eliminación de médicos;
- validaciones incorrectas con Zod;
- recursos inexistentes;
- filtro de turnos por especialidad;
- filtro de turnos por fecha;
- filtro de turnos por `medicoId`;
- filtro de médicos por especialidad;
- filtro de médicos por disponibilidad;
- pruebas automatizadas en Postman;
- respuestas mediante Mock Server.

## Lectura y almacenamiento de turnos

Los turnos se almacenan en:

```text
data/turnos.json
```

El servicio `cargarTurnos` utiliza `readFile` de `node:fs/promises` junto con `await` y manejo de errores.

El servicio `guardarTurnos` utiliza `writeFile` para persistir las modificaciones realizadas sobre los turnos.

El uso de operaciones asíncronas permite realizar la lectura y escritura sin bloquear innecesariamente la ejecución del servidor.

## Uso de Inteligencia Artificial

Durante el desarrollo de la actividad se utilizó ChatGPT como herramienta de apoyo.

Las respuestas generadas por la herramienta fueron revisadas, probadas y adaptadas manualmente antes de incorporarlas al proyecto.

| Tarea | Herramienta | Prompt | Respuesta generada | Ajuste manual aplicado |
| --- | --- | --- | --- | --- |
| Schemas Zod | ChatGPT | Crear schemas de validación para Turno y Médico utilizando Zod | Propuesta de schemas y reglas de validación | Se adaptaron los campos, tipos y especialidades requeridos por TurnosRed |
| Manejo de errores | ChatGPT | Cómo implementar errores estandarizados en una API Express | Propuesta de `AppError` y middleware de errores | Se adaptaron códigos, mensajes y estructura JSON |
| CRUD Médico | ChatGPT | Cómo implementar un CRUD RESTful de médicos con TypeScript y Express | Propuesta de modelo, service, controller y routes | Se integró a la arquitectura existente del proyecto |
| Query Parameters | ChatGPT | Cómo filtrar turnos y médicos mediante query params | Ejemplos de filtros en servicios y controladores | Se adaptaron a `especialidad`, `fecha`, `medicoId` y `disponible` |
| Tests Postman | ChatGPT | Cómo crear tests automáticos para una API REST | Scripts JavaScript con aserciones | Se adaptaron los tests a los endpoints y respuestas de TurnosRed |
| Mock Server | ChatGPT | Cómo simular respuestas de TurnosRed en Postman | Ejemplo de endpoints y respuestas simuladas | Se configuraron casos `200` y `404` con datos del proyecto |
| Documentación | ChatGPT | Cómo actualizar el README para documentar la Actividad 2 | Estructura de documentación técnica | Se revisaron rutas, comandos, ejemplos y variables utilizadas |

## Refactorización de Controllers

La API fue refactorizada para mejorar la separación de responsabilidades y mantener una arquitectura organizada basada en controladores.

Los controladores de Turnos y Médicos utilizan funciones asincrónicas (`async`) y retornos explícitos para evitar que la ejecución continúe luego de enviar una respuesta al cliente.

También se incorporó `generalController.ts`, encargado de gestionar el endpoint de bienvenida y las solicitudes realizadas hacia rutas inexistentes.

El endpoint de bienvenida:

```text
GET /
```

responde con código `200 OK`.

Las rutas inexistentes son gestionadas por el controller general y responden con código `404 Not Found`:

```json
{
  "status": 404,
  "message": "Ruta no encontrada",
  "code": "NOT_FOUND"
}
```

## Happy Path y Unhappy Path

La API fue verificada nuevamente mediante Postman después de la refactorización.

Se comprobaron escenarios exitosos (Happy Path), como el listado de turnos con `200 OK`, la creación de turnos con `201 Created` y el acceso correcto al endpoint de bienvenida.

También se comprobaron escenarios de error (Unhappy Path), incluyendo IDs inexistentes con `404 Not Found`, datos inválidos con `400 Bad Request` y rutas inexistentes con `404 Not Found`.

Las pruebas automatizadas de Postman permiten verificar los códigos HTTP, la estructura JSON y los mensajes devueltos por la API.

## Autor

Proyecto académico desarrollado para la materia Integraciones Web.



