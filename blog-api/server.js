const express = require('express');
const app = express();
require('dotenv').config();

// Middleware para parsear JSON
app.use(express.json());

// Rutas de la API
app.use('/api/posts', require('./routes/posts'));
app.use('/api/autores', require('./routes/autores'));

// Ruta raíz
app.get('/', (req, res) => {
  res.json({
    mensaje: 'Blog API - Actividad 8 UNIR',
    rutas: [
      'GET  /api/posts',
      'GET  /api/posts/:id',
      'POST /api/posts',
      'GET  /api/autores',
      'GET  /api/autores/:id',
      'GET  /api/autores/:id/posts',
      'POST /api/autores',
    ],
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
