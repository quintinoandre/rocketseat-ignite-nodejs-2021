import { container } from 'tsyringe';

import { IMailProvider } from '.';
import { EtherealMailProvider } from './implementations';

export * from './IMailProvider';

container.registerInstance<IMailProvider>(
	'EtherealMailProvider',
	new EtherealMailProvider()
);
