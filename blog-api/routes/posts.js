const express = require('express');
const router = express.Router();
const db = require('../db');

// consulta con JOIN para traer los datos del autor junto al post
const POSTS_CON_AUTOR = `
  SELECT
    p.id, p.titulo, p.descripcion, p.fecha_creacion, p.categoria, p.creado_en,
    a.id AS autor_id, a.nombre AS autor_nombre, a.email AS autor_email, a.imagen AS autor_imagen
  FROM posts p
  JOIN autores a ON p.autor_id = a.id
`;

function formatPost(row) {
  return {
    id: row.id,
    titulo: row.titulo,
    descripcion: row.descripcion,
    fecha_creacion: row.fecha_creacion,
    categoria: row.categoria,
    creado_en: row.creado_en,
    autor: {
      id: row.autor_id,
      nombre: row.autor_nombre,
      email: row.autor_email,
      imagen: row.autor_imagen,
    },
  };
}

router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query(POSTS_CON_AUTOR + ' ORDER BY p.fecha_creacion DESC');
    res.json(rows.map(formatPost));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.query(POSTS_CON_AUTOR + ' WHERE p.id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Post no encontrado' });
    res.json(formatPost(rows[0]));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  const { titulo, descripcion, fecha_creacion, categoria, autor_id } = req.body;
  if (!titulo || !descripcion || !fecha_creacion || !categoria || !autor_id) {
    return res.status(400).json({ error: 'titulo, descripcion, fecha_creacion, categoria y autor_id son obligatorios' });
  }
  try {
    const [result] = await db.query(
      'INSERT INTO posts (titulo, descripcion, fecha_creacion, categoria, autor_id) VALUES (?, ?, ?, ?, ?)',
      [titulo, descripcion, fecha_creacion, categoria, autor_id]
    );
    const [rows] = await db.query(POSTS_CON_AUTOR + ' WHERE p.id = ?', [result.insertId]);
    res.status(201).json(formatPost(rows[0]));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
