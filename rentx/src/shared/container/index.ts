import { container } from 'tsyringe';

import {
	CategoriesRepository,
	ICategoriesRepository,
	ISpecificationsRepository,
	SpecificationsRepository,
} from '../../modules/cars/repositories';

container.registerSingleton<ICategoriesRepository>(
	'CategoriesRepository',
	CategoriesRepository
);

container.registerSingleton<ISpecificationsRepository>(
	'SpecificationsRepository',
	SpecificationsRepository
);
