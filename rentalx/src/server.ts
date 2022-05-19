import express from 'express';

const app = express();

app.use(express.json());

app.get('/', (request, response) => {
	return response.json({ message: 'Hello World!' });
});

app.post('/courses', (request, response) => {
	const {
		body: { name },
	} = request;

	return response.json({ name });
});

const PORT = 3333;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
