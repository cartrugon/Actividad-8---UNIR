const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res) => {
  try {
    const [autores] = await db.query('SELECT * FROM autores');
    res.json(autores);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const [autores] = await db.query('SELECT * FROM autores WHERE id = ?', [req.params.id]);
    if (autores.length === 0) return res.status(404).json({ error: 'Autor no encontrado' });
    res.json(autores[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// posts de un autor concreto
router.get('/:id/posts', async (req, res) => {
  try {
    const [autores] = await db.query('SELECT * FROM autores WHERE id = ?', [req.params.id]);
    if (autores.length === 0) return res.status(404).json({ error: 'Autor no encontrado' });

    const [posts] = await db.query(
      `SELECT p.*, a.nombre AS autor_nombre, a.email AS autor_email, a.imagen AS autor_imagen
       FROM posts p
       JOIN autores a ON p.autor_id = a.id
       WHERE p.autor_id = ?`,
      [req.params.id]
    );

    res.json({ autor: autores[0], posts });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  const { nombre, email, imagen } = req.body;
  if (!nombre || !email) {
    return res.status(400).json({ error: 'nombre y email son obligatorios' });
  }
  try {
    const [result] = await db.query(
      'INSERT INTO autores (nombre, email, imagen) VALUES (?, ?, ?)',
      [nombre, email, imagen || null]
    );
    res.status(201).json({ id: result.insertId, nombre, email, imagen: imagen || null });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
