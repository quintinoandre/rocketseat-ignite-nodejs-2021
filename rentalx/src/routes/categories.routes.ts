import { Router } from 'express';

const categoriesRoutes = Router();

const categories = [];

categoriesRoutes.post('/categories', (request, response) => {
	const {
		body: { name, description },
	} = request;

	categories.push({ name, description });

	return response.sendStatus(201); //* Created
});

export { categoriesRoutes };
