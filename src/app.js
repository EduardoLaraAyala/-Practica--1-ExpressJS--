// Importa el módulo Express
const express = require('express');

// Crea una instancia de Express
const app = express();

app.get('/', (req, res) => {
    const { name, lastName } = req.query; // Extrae los parámetros 'name' y 'lastName' del query
    const message = `Hola ${name} ${lastName}`; // Construye el mensaje utilizando los parámetros recibidos
    res.send(message); // Envía el mensaje como respuesta
  });

// Especifica el puerto en el que el servidor escuchará las solicitudes
const PORT = 3002;

// Inicia el servidor y haz que escuche en el puerto especificado
app.listen(PORT, () => {
  console.log(`Servidor API escuchando en http://localhost:${PORT}?name=Eduardo&lastName=Lara`);
});
