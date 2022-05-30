import { container } from 'tsyringe';

import { UsersRepository } from '@modules/accounts/infra';
import { IUsersRepository } from '@modules/accounts/repositories';
import {
	CategoriesRepository,
	SpecificationsRepository,
} from '@modules/cars/infra';
import {
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
