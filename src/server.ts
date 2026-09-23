import "dotenv/config";
import { createServer } from "node:http";
import express from "express";
import { Server } from "socket.io";
import type { Turno } from "./models/turno.js";
import { turnosRouter } from "./routes/turnosRoutes.js";
import { eventosTurnos } from "./services/eventosTurnos.js";

const app = express();
const port = Number(process.env.PORT ?? 3000);

app.use(express.json());
app.use(express.static("public"));

app.get("/", (_req, res) => {
  res.json({ mensaje: "TurnosRed funciona" });
});

app.use("/turnos", turnosRouter);

const httpServer = createServer(app);
const io = new Server(httpServer);

io.on("connection", (socket) => {
  console.log(`Cliente conectado: ${socket.id}`);
});

eventosTurnos.on("turno:creado", (turno: Turno) => {
  io.emit("turno:nuevo", turno);
});

eventosTurnos.on("turno:actualizado", (turno: Turno) => {
  io.emit("turno:actualizado", turno);
});

eventosTurnos.on("turno:eliminado", (turno: Turno) => {
  io.emit("turno:eliminado", turno);
});

httpServer.listen(port, () => {
  console.log(`Servidor disponible en http://localhost:${port}`);
});
