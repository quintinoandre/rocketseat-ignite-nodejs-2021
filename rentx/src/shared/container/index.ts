import { container } from 'tsyringe';

import {
	CategoriesRepository,
	ICategoriesRepository,
} from '../../modules/cars/repositories';

container.registerSingleton<ICategoriesRepository>(
	'CategoriesRepository',
	CategoriesRepository
);
