const express = require('express');

const app = express();

/**
 * GET - Procurar uma informação dentro do servidor
 * POST - Inserir uma informação no servidor
 * PUT - Alterar uma informação no servidor
 * PATCH - Alterar uma informação específica
 * DELETE - Remover uma informação no servidor
 */

// localhost:3333

app.get('/courses', (request, response) => {
  return response.json(['Course 1', 'Course 2', 'Course 3']);
});

app.post('/courses', (request, response) => {
  return response.json(['Course 1', 'Course 2', 'Course 3', 'Course 4']);
});

app.put('/courses/:id', (request, response) => {
  return response.json(['Course 6', 'Course 2', 'Course 3', 'Course 4']);
});

app.patch('/courses/:id', (request, response) => {
  return response.json(['Course 6', 'Course 7', 'Course 3', 'Course 4']);
});

app.delete('/courses/:id', (request, response) => {
  return response.json(['Course 6', 'Course 7', 'Course 4']);
});

app.listen(3333);
