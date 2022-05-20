import { Router } from 'express';

import { Category } from '../model/category';

const categoriesRoutes = Router();

const categories: Array<Category> = [];

categoriesRoutes.post('/', (request, response) => {
	const {
		body: { name, description },
	} = request;

	const category = new Category();

	Object.assign(category, {
		name,
		description,
		created_at: new Date(),
	});

	categories.push(category);

	return response.status(201).json({ category }); //* Created
});

export { categoriesRoutes };
