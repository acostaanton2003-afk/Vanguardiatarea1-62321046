// npm install express  →  node api.js

const express = require("express");
const app = express();
app.use(express.json());

let usuarios = [
  { id: 1, nombre: "Ana", email: "ana@mail.com" },
  { id: 2, nombre: "Luis", email: "luis@mail.com" },
];

// GET — obtener todos
app.get("/usuarios", (req, res) => {
  res.json(usuarios);
});

// GET — obtener uno
app.get("/usuarios/:id", (req, res) => {
  const usuario = usuarios.find(u => u.id == req.params.id);
  usuario ? res.json(usuario) : res.status(404).json({ error: "No encontrado" });
});

// POST — crear
app.post("/usuarios", (req, res) => {
  const nuevo = { id: usuarios.length + 1, ...req.body };
  usuarios.push(nuevo);
  res.status(201).json(nuevo);
});

// PUT — reemplazar completo
app.put("/usuarios/:id", (req, res) => {
  const i = usuarios.findIndex(u => u.id == req.params.id);
  if (i === -1) return res.status(404).json({ error: "No encontrado" });
  usuarios[i] = { id: Number(req.params.id), ...req.body };
  res.json(usuarios[i]);
});

// PATCH — actualizar parcial
app.patch("/usuarios/:id", (req, res) => {
  const usuario = usuarios.find(u => u.id == req.params.id);
  if (!usuario) return res.status(404).json({ error: "No encontrado" });
  Object.assign(usuario, req.body);
  res.json(usuario);
});

// DELETE — eliminar
app.delete("/usuarios/:id", (req, res) => {
  const i = usuarios.findIndex(u => u.id == req.params.id);
  if (i === -1) return res.status(404).json({ error: "No encontrado" });
  usuarios.splice(i, 1);
  res.json({ mensaje: "Eliminado" });
});

app.listen(3000, () => console.log("Servidor en http://localhost:3000"));
