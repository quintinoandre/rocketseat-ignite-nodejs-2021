const express = require('express');
const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(express.json());

const customers = [];

/**
 * nif: string
 * name: string
 * id: uuid
 * statement: []
 */
app.post('/accounts', (request, response) => {
  const {
    body: { nif, name },
  } = request;

  const id = uuidv4();

  customers.push({ nif, name, id, statement: [] });

  return response.sendStatus(201); //* Created
});

app.listen(3333);
