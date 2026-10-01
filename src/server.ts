import "dotenv/config";
import express from "express";
import { turnosRouter } from "./routes/turnosRoutes.js";
import medicosRouter from "./routes/medicosRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";
import {
  bienvenida,
  rutaNoEncontrada,
} from "./controllers/generalController.js";

const app = express();
const port = Number(process.env.PORT ?? 3000);

app.use(express.json());
app.use(express.static("public"));

// Endpoint de bienvenida manejado por el controller general.
app.get("/", bienvenida);

app.use("/turnos", turnosRouter);
app.use("/medicos", medicosRouter);

// Rutas no encontradas.
// Debe ir después de todas las rutas existentes.
app.use(rutaNoEncontrada);

// Middleware centralizado de errores.
// Debe ir al final.
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Servidor disponible en http://localhost:${port}`);
});

