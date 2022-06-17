import { container } from 'tsyringe';

import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations';

import { IDateProvider } from '.';

export * from './IDateProvider';

container.registerSingleton<IDateProvider>(
	'DayjsDateProvider',
	DayjsDateProvider
);
