const express = require('express');
const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(express.json());

const customers = [];

const STATEMENT_TYPES = Object.freeze({
  credit: 'credit',
  debit: 'debit',
});

// Middleware
function verifyIfExistsAccountNIF(request, response, next) {
  const {
    headers: { nif },
  } = request;

  const customer = customers.find((customer) => customer.nif === nif);

  if (!customer)
    return response.status(404).json({ error: 'Customer not found' }); //! Not Found

  request.customer = customer;

  return next();
}

function getBalance(statement) {
  const balance = statement.reduce((accumulator, currentValue) => {
    if (currentValue.type === STATEMENT_TYPES.credit)
      return accumulator + currentValue.amount;
    return accumulator - currentValue.amount;
  }, 0);

  return balance;
}

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

// app.use(verifyIfExistsAccountNIF);

app.get('/statement', verifyIfExistsAccountNIF, (request, response) => {
  const { customer } = request;

  return response.json(customer.statement);
});

app.post('/deposit', verifyIfExistsAccountNIF, (request, response) => {
  const {
    body: { description, amount },
    customer,
  } = request;

  const statementOperation = {
    description,
    amount,
    createdAt: new Date(),
    type: STATEMENT_TYPES.credit,
  };

  customer.statement.push(statementOperation);

  return response.sendStatus(201); //* Created
});

app.post('/withdraw', verifyIfExistsAccountNIF, (request, response) => {
  const {
    body: { amount },
    customer,
  } = request;

  const balance = getBalance(customer.statement);

  if (balance < amount)
    return response.status(400).json({ error: 'Insufficient funds' }); //! Bad Request

  const statementOperation = {
    amount,
    createdAt: new Date(),
    type: STATEMENT_TYPES.debit,
  };

  customer.statement.push(statementOperation);

  return response.sendStatus(201); //* Created
});

app.get('/statement/date', verifyIfExistsAccountNIF, (request, response) => {
  const {
    query: { date },
    customer,
  } = request;

  const dateFormat = new Date(`${date} 00:00`);

  const statement = customer.statement.filter(
    (statement) =>
      statement.createdAt.toDateString() === new Date(dateFormat).toDateString()
  );

  return response.json(statement);
});

const PORT = 3333;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
