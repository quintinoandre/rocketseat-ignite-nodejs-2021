const express = require('express');

const app = express();

// localhost:3333

app.get('/', (request, response) => {
  return response.json({ message: 'Hello World Ingite!' });
});

app.listen(3333);
