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
import { IDateProvider } from '@shared/container/providers/DateProvider';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations';
import { IMailProvider } from '@shared/container/providers/MailProvider';
import { EtherealMailProvider } from '@shared/container/providers/MailProvider/implementations';

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

container.registerSingleton<IDateProvider>(
	'DayjsDateProvider',
	DayjsDateProvider
);

container.registerInstance<IMailProvider>(
	'EtherealMailProvider',
	new EtherealMailProvider()
);
