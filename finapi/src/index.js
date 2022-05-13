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
app.post('/account', (request, response) => {
  const {
    body: { nif, name },
  } = request;

  const customerAlreadyExists = customers.some(
    (customer) => customer.nif === nif
  );

  if (customerAlreadyExists)
    return response.status(400).json({ error: 'Customer already exists' }); //! Bad Request

  customers.push({ nif, name, id: uuidv4(), statement: [] });

  return response.sendStatus(201); //* Created
});

app.get('/statement', (request, response) => {
  const {
    headers: { nif },
  } = request;

  const customer = customers.find((customer) => customer.nif === nif);

  if (!customer)
    return response.status(404).json({ error: 'Customer not found' }); //! Not Found

  return response.json(customer.statement);
});

const PORT = 3333;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
