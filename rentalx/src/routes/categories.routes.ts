import { Router } from 'express';

import { CategoriesRepository } from '../repositories/CategoriesRepository';

const categoriesRoutes = Router();

const categoriesRepository = new CategoriesRepository([]);

categoriesRoutes.post('/', (request, response) => {
	const {
		body: { name, description },
	} = request;

	categoriesRepository.create({ name, description });

	return response.sendStatus(201); //* Created
});

categoriesRoutes.get('/', (request, response) => {
	const all = categoriesRepository.list();

	return response.json(all);
});

export { categoriesRoutes };
