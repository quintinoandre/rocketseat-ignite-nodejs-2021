import { Router } from 'express';

import {
	createCategoryController,
	listCategoriesController,
} from '../modules/cars/useCases';

const categoriesRoutes = Router();

categoriesRoutes.post('/', (request, response) => {
	return createCategoryController.handle(request, response);
});

categoriesRoutes.get('/', (request, response) => {
	return listCategoriesController.handle(request, response);
});

export { categoriesRoutes };
