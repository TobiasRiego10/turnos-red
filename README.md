# TurnosRed

API de turnos médicos desarrollada con Node.js, Express y TypeScript. Guarda los turnos en un archivo JSON y muestra los cambios en tiempo real mediante Socket.IO.

## Requisitos

- Node.js 24.21.0 (versión indicada en `.nvmrc`)
- npm

## Instalación

```powershell
npm ci
```

Copiar `.env.example` a `.env`:

```powershell
Copy-Item .env.example .env
```

Las variables de entorno son:

- `PORT`: puerto del servidor. Por defecto, `3000`.
- `DATA_FILE`: ruta del archivo JSON donde se guardan los turnos.

## Ejecución

```powershell
npm run build
npm start
```

La API estará disponible en `http://localhost:3000` y el monitor en `http://localhost:3000/monitor.html`.

## Comandos

- `npm run build`: compila TypeScript en `dist/`.
- `npm start`: inicia el servidor compilado.
- `npm run lint`: revisa los archivos TypeScript con ESLint.
- `npm run format`: formatea el código con Prettier.

## Rutas de la API

| Método | Ruta | Acción |
| --- | --- | --- |
| GET | `/turnos` | Lista los turnos |
| GET | `/turnos/:id` | Obtiene un turno |
| POST | `/turnos` | Crea un turno |
| PUT | `/turnos/:id` | Actualiza un turno |
| DELETE | `/turnos/:id` | Elimina un turno |

Ejemplo de cuerpo JSON para crear un turno:

```json
{
  "id": 104,
  "paciente": "Lucia Gomez",
  "documento": "40123456",
  "especialidad": "clinica",
  "fecha": "2026-09-23",
  "hora": "11:30",
  "confirmado": true
}
```

La API responde con códigos `200`, `201`, `400`, `404` o `500` según el resultado.

## Estructura

- `src/models/`: tipos de datos.
- `src/services/`: lectura, escritura, normalización y eventos internos.
- `src/controllers/`: lógica de las peticiones.
- `src/routes/`: definición de rutas.
- `public/monitor.html`: página que recibe cambios en tiempo real.
- `data/turnos.json`: datos de los turnos.

## Lectura de archivos

`cargarTurnos` usa `readFile` de `node:fs/promises` con `await` y `try/catch`: espera el contenido sin bloquear el servidor y puede manejar errores. La API de callbacks de `node:fs` realiza la lectura pasando una función que recibe `(error, contenido)` cuando termina; en este proyecto se eligieron promesas para mantener una secuencia más clara.

