import { container } from 'tsyringe';

import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories';
import { IUsersRepository } from '@modules/accounts/repositories';
import {
	CategoriesRepository,
	SpecificationsRepository,
	CarsRepository,
} from '@modules/cars/infra/typeorm/repositories';
import {
	ICarsRepository,
	ICategoriesRepository,
	ISpecificationsRepository,
} from '@modules/cars/repositories';

container.registerSingleton<ICategoriesRepository>(
	'CategoriesRepository',
	CategoriesRepository
);

container.registerSingleton<ISpecificationsRepository>(
	'SpecificationsRepository',
	SpecificationsRepository
);

container.registerSingleton<IUsersRepository>(
	'UsersRepository',
	UsersRepository
);

container.registerSingleton<ICarsRepository>('CarsRepository', CarsRepository);
