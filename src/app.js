// Importa el módulo Express
const express = require('express');

//crea instancia de Express
const app = express();

const PORT = 3002;

const fs = require('fs');

app.use(express.json());

// app.use(function(req, res, next) {
//     console.log(req._parsedUrl.pathname)
//     if(req._parsedUrl.pathname !== "/users/")
//     res.status(500).send('Ruta solicitada no');
//     next()
//   });

//un usuario cxon nombre y apellidoS
//   app.get('/users', (req, res) => {
//      const { name, lastName } = req.query; // Extrae los parámetros 'name' y 'lastName' del query
//       const message = `Hola ${name} ${lastName}`; // Construye el mensaje utilizando los parámetros recibidos
//       res.send(message); // Envía el mensaje como respuesta
//     });

//todos los usuarios
  app.get('/users', (req, res) => {
    // Lee el contenido del archivo users.json
    fs.readFile('users.json', 'utf8', (err, data) => {
      if (err) {
        console.error('Error al leer el archivo users.json:', err);
        return res.status(500).send('Error interno del servidor');
      }
  
      // Parsea el contenido del archivo JSON a un objeto JavaScript
      const users = JSON.parse(data);
  
      // Envía el contenido del archivo JSON como respuesta
      res.json(users);
    });
  });

  app.get('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id); // Obtener el ID del parámetro de la ruta y convertirlo a número entero
  
    // Leer el contenido del archivo users.json
    fs.readFile('users.json', 'utf8', (err, data) => {
      if (err) {
        console.error('Error al leer el archivo users.json:', err);
        return res.status(500).send('Error interno del servidor');
      }
  
      try {
        // Convertir el contenido del archivo JSON a un array de objetos JavaScript
        const users = JSON.parse(data);
  
        // Buscar el usuario con el ID correspondiente
        const user = users.find(user => user.id === userId);
  
        // Si se encuentra el usuario, devolverlo como respuesta
        if (user) {
          res.json(user);
        } else {
          // Si no se encuentra el usuario, devolver un mensaje de error
          res.status(404).send('Usuario no encontrado');
        }
      } catch (parseError) {
        console.error('Error al analizar el contenido del archivo JSON:', parseError);
        res.status(500).send('Error interno del servidor al analizar el contenido JSON');
      }
    });
  });



//   app.post('/users', (req, res) => {
//     res.send('Got a POST request');
//   });

// Ruta para la solicitud POST en '/users'
app.post('/users', (req, res) => {
    // Leer el contenido actual del archivo users.json
    fs.readFile('users.json', 'utf8', (err, data) => {
      if (err) {
        console.error('Error al leer el archivo users.json:', err);
        return res.status(500).send('Error interno del servidor');
      }
  
      try {
        // Convertir el contenido del archivo JSON a un array de objetos JavaScript
        const users = JSON.parse(data);
  
        // Extraer los datos del nuevo usuario del cuerpo de la solicitud
        const newUser = req.body;
  
        // Agregar el nuevo usuario al array de usuarios
        users.push(newUser);
  
        // Escribir el contenido actualizado del array de usuarios de vuelta al archivo users.json
        fs.writeFile('users.json', JSON.stringify(users, null, 2), err => {
          if (err) {
            console.error('Error al escribir en el archivo users.json:', err);
            return res.status(500).send('Error interno del servidor');
          }
          // Envía una respuesta de éxito
          res.status(201).send('Usuario creado correctamente');
        });
      } catch (parseError) {
        console.error('Error al analizar el contenido del archivo JSON:', parseError);
        res.status(500).send('Error interno del servidor al analizar el contenido JSON');
      }
    });
  });


  app.put('/users', (req, res) => {
    res.send('Got a PUT request at /user');
  });

//   app.delete('/users', (req, res) => {
//     res.send('Got a DELETE request at /user');
//   });

//borrar usuario id
app.put('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id); // Obtener el ID del parámetro de la ruta y convertirlo a número entero
  
    // Leer el contenido del archivo users.json
    fs.readFile('users.json', 'utf8', (err, data) => {
      if (err) {
        console.error('Error al leer el archivo users.json:', err);
        return res.status(500).send('Error interno del servidor');
      }
  
      try {
        // Convertir el contenido del archivo JSON a un array de objetos JavaScript
        let users = JSON.parse(data);
  
        // Encontrar el índice del usuario en el array
        const userIndex = users.findIndex(user => user.id === userId);
  
        // Si se encuentra el usuario, eliminarlo del array
        if (userIndex !== -1) {
          users.splice(userIndex, 1);
            
        //   users.splice(userIndex, 1, {name:"cesar", lastName:"Garcia"})
          // Escribir el contenido actualizado del array de usuarios de vuelta al archivo users.json
          fs.writeFile('users.json', JSON.stringify(users, null, 2), err => {
            if (err) {
              console.error('Error al escribir en el archivo users.json:', err);
              return res.status(500).send('Error interno del servidor');
            }
            // Envía una respuesta de éxito
            res.send('Usuario eliminado correctamente');
          });
        } else {
          // Si no se encuentra el usuario, devolver un mensaje de error
          res.status(404).send('Usuario no encontrado');
        }
      } catch (parseError) {
        console.error('Error al analizar el contenido del archivo JSON:', parseError);
        res.status(500).send('Error interno del servidor al analizar el contenido JSON');
      }
    });
  });
  
  app.use((req, res, next) => {
    res.status(404).send('Error 404: Not Found');
  });

app.listen(PORT, () => {
  console.log(`Servidor API escuchando en http://localhost:${PORT}/users/?name=Eduardo&lastName=Lara`);
});
