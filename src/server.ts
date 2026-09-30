import "dotenv/config";
import express from "express";
import { turnosRouter } from "./routes/turnosRoutes.js";
import medicosRouter from "./routes/medicosRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();
const port = Number(process.env.PORT ?? 3000);

app.use(express.json());
app.use(express.static("public"));

app.get("/", (_req, res) => {
  res.json({ mensaje: "TurnosRed funciona" });
});

app.use("/turnos", turnosRouter);
app.use("/medicos", medicosRouter);

// Middleware centralizado de errores.
// Debe ir después de todas las rutas.
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Servidor disponible en http://localhost:${port}`);
});

