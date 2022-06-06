import { container } from 'tsyringe';

import { IDateProvider } from './DateProvider';
import { DayjsDateProvider } from './DateProvider/implementations';

container.registerSingleton<IDateProvider>(
	'DayjsDateProvider',
	DayjsDateProvider
);
