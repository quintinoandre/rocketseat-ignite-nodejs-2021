import { container } from 'tsyringe';

import {
	EtherealMailProvider,
	SESMailProvider,
} from '@shared/container/providers/MailProvider/implementations';

import { IMailProvider } from '.';

export * from './IMailProvider';

const {
	env: { MAIL_PROVIDER },
} = process;

const mailProvider = {
	ETHEREAL: container.resolve(EtherealMailProvider),
	SES: container.resolve(SESMailProvider),
};

container.registerInstance<IMailProvider>(
	'MailProvider',
	mailProvider[MAIL_PROVIDER]
);
