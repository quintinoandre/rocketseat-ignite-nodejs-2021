const express = require('express');

const app = express();

app.use(express.json());

/**
 * GET - Procurar uma informação dentro do servidor
 * POST - Inserir uma informação no servidor
 * PUT - Alterar uma informação no servidor
 * PATCH - Alterar uma informação específica
 * DELETE - Remover uma informação no servidor
 */

/**
 * Tipos de parâmetros:
 *
 * Route Params => Parâmetros que vem na própria rota e que identificam um recurso (Editar/Remover/Procurar)
 * Query Params => Parâmetros que vem na própria rota e que são utilizados para filtrar os resultados (Paginação, Filtro)
 * Body Params => Parâmetros/objetos (JSON) que vem no corpo da requisição (Criação/Edição)
 */

// localhost:3333

app.get('/courses', (request, response) => {
  const { query } = request;

  console.log(query);

  return response.json(['Course 1', 'Course 2', 'Course 3']);
});

app.post('/courses', (request, response) => {
  const { body } = request;

  console.log(body);

  return response.json(['Course 1', 'Course 2', 'Course 3', 'Course 4']);
});

app.put('/courses/:id', (request, response) => {
  const {
    params: { id },
  } = request;

  console.log(id);

  return response.json(['Course 6', 'Course 2', 'Course 3', 'Course 4']);
});

app.patch('/courses/:id', (request, response) => {
  return response.json(['Course 6', 'Course 7', 'Course 3', 'Course 4']);
});

app.delete('/courses/:id', (request, response) => {
  return response.json(['Course 6', 'Course 7', 'Course 4']);
});

app.listen(3333);
