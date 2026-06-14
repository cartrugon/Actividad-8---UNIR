# Actividad 8 - Blog API

Actividad correspondiente al Módulo 5 del Máster Full Stack de UNIR.

## Descripción

Se ha desarrollado una API REST con Node.js, Express y MySQL para gestionar los datos de un blog. La API permite crear y consultar tanto posts como autores, cumpliendo con los requisitos de la actividad.

La base de datos está compuesta por dos tablas relacionadas: `autores` y `posts`. La tabla de posts incluye una clave externa que referencia al autor, lo que permite recuperar en cada petición todos los datos del autor junto con el post, en lugar de devolver únicamente su identificador.

Se ha definido también una ruta específica para obtener todos los posts escritos por un autor concreto.

Todas las rutas de la API parten del prefijo `/api`.

## Tecnologías utilizadas

- Node.js
- Express
- MySQL
- dotenv

## Endpoints

### Posts
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | /api/posts | Obtener todos los posts |
| GET | /api/posts/:id | Obtener un post por id |
| POST | /api/posts | Crear un nuevo post |

### Autores
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | /api/autores | Obtener todos los autores |
| GET | /api/autores/:id | Obtener un autor por id |
| GET | /api/autores/:id/posts | Obtener los posts de un autor |
| POST | /api/autores | Crear un nuevo autor |
