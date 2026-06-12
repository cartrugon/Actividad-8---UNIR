const express = require('express');
const app = express();
require('dotenv').config();

app.use(express.json());

app.use('/api/posts', require('./routes/posts'));
app.use('/api/autores', require('./routes/autores'));

app.get('/', (req, res) => {
  res.json({ mensaje: 'Blog API funcionando' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});
