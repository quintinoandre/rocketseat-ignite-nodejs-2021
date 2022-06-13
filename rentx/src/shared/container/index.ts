import { container } from 'tsyringe';

import {
	UsersRepository,
	UsersTokensRepository,
} from '@modules/accounts/infra/typeorm/repositories';
import {
	IUsersRepository,
	IUsersTokensRepository,
} from '@modules/accounts/repositories';
import {
	CategoriesRepository,
	SpecificationsRepository,
	CarsRepository,
	CarsImagesRepository,
} from '@modules/cars/infra/typeorm/repositories';
import {
	ICarsImagesRepository,
	ICarsRepository,
	ICategoriesRepository,
	ISpecificationsRepository,
} from '@modules/cars/repositories';
import { RentalsRepository } from '@modules/rentals/infra/typeorm/repositories';
import { IRentalsRepository } from '@modules/rentals/repositories';

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

container.registerSingleton<ICarsImagesRepository>(
	'CarsImagesRepository',
	CarsImagesRepository
);

container.registerSingleton<IRentalsRepository>(
	'RentalsRepository',
	RentalsRepository
);

container.registerSingleton<IUsersTokensRepository>(
	'UsersTokensRepository',
	UsersTokensRepository
);
