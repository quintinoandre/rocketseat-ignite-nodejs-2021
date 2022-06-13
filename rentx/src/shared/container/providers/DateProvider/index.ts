import { container } from 'tsyringe';

import { IDateProvider } from '.';
import { DayjsDateProvider } from './implementations';

export * from './IDateProvider';

container.registerSingleton<IDateProvider>(
	'DayjsDateProvider',
	DayjsDateProvider
);
