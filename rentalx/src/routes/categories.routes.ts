import { Router } from 'express';

import { CategoriesRepository } from '../modules/cars/repositories';
import { createCategoryController } from '../modules/cars/useCases';

const categoriesRoutes = Router();

const categoriesRepository = new CategoriesRepository();

categoriesRoutes.post('/', (request, response) => {
	return createCategoryController.handle(request, response);
});

categoriesRoutes.get('/', (request, response) => {
	const all = categoriesRepository.list();

	return response.json(all);
});

export { categoriesRoutes };
