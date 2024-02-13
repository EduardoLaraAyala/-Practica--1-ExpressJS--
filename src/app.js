// Importa el módulo Express
const express = require('express');

//crea instancia de Express
const app = express();

const PORT = 3002;


app.get('/users', (req, res) => {
    const { name, lastName } = req.query; // Extrae los parámetros 'name' y 'lastName' del query
    const message = `Hola ${name} ${lastName}`; // Construye el mensaje utilizando los parámetros recibidos
    res.send(message); // Envía el mensaje como respuesta
  });

  app.post('/users', (req, res) => {
    res.send('Got a POST request');
  });

  app.put('/users', (req, res) => {
    res.send('Got a PUT request at /user');
  });

  app.delete('/users', (req, res) => {
    res.send('Got a DELETE request at /user');
  });
  
  app.use((req, res, next) => {
    res.status(404).send('Error 404: Not Found');
  });

app.listen(PORT, () => {
  console.log(`Servidor API escuchando en http://localhost:${PORT}/users/?name=Eduardo&lastName=Lara`);
});
