import { Router } from 'express';

import { CategoriesRepository } from '../modules/cars/repositories';
import { CreateCategoryService } from '../modules/cars/services';

const categoriesRoutes = Router();

const categoriesRepository = new CategoriesRepository();

categoriesRoutes.post('/', (request, response) => {
	const {
		body: { name, description },
	} = request;

	const creatCategoryService = new CreateCategoryService(categoriesRepository);

	creatCategoryService.execute({ name, description });

	return response.sendStatus(201); //* Created
});

categoriesRoutes.get('/', (request, response) => {
	const all = categoriesRepository.list();

	return response.json(all);
});

export { categoriesRoutes };
