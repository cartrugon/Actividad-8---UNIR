
-- Actividad 8: Blog API - Estructura de base de datos
autores

CREATE DATABASE IF NOT EXISTS blog_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE blog_db;

-- Tabla autores
CREATE TABLE IF NOT EXISTS autores (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  imagen VARCHAR(255),
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla posts
CREATE TABLE IF NOT EXISTS posts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(255) NOT NULL,
  descripcion TEXT NOT NULL,
  fecha_creacion DATE NOT NULL,
  categoria VARCHAR(100) NOT NULL,
  autor_id INT NOT NULL,
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (autor_id) REFERENCES autores(id) ON DELETE CASCADE
);

-- Datos de prueba
INSERT INTO autores (nombre, email, imagen) VALUES
  ('Carlos García', 'carlos@blog.com', 'https://i.pravatar.cc/150?u=carlos'),
  ('María López', 'maria@blog.com', 'https://i.pravatar.cc/150?u=maria');

INSERT INTO posts (titulo, descripcion, fecha_creacion, categoria, autor_id) VALUES
  ('Introducción a Express.js', 'Express es un framework minimalista para Node.js que facilita la creación de APIs REST.', '2024-01-10', 'Backend', 1),
  ('MySQL con Node.js', 'Cómo conectar y consultar una base de datos MySQL desde una aplicación Node.js.', '2024-02-15', 'Backend', 1),
  ('Diseño de APIs REST', 'Buenas prácticas para el diseño de APIs RESTful escalables.', '2024-03-20', 'Arquitectura', 2);
