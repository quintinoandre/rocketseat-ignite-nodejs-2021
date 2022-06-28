import express from 'express';
import 'dotenv/config';

const {
	env: { PORT },
} = process;

const app = express();

app.get('/', (request, response) => response.json({ message: 'Hello World' }));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
