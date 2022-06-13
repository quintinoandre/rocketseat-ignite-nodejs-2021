import fs from 'fs';
import handlebars from 'handlebars';
import {
	createTestAccount,
	Transporter,
	createTransport,
	getTestMessageUrl,
} from 'nodemailer';
import { injectable } from 'tsyringe';

import { IMailProvider } from '@shared/container/providers/MailProvider';

@injectable()
class EtherealMailProvider implements IMailProvider {
	private client: Transporter;

	constructor() {
		createTestAccount()
			.then((account) => {
				const transporter = createTransport({
					host: account.smtp.host,
					port: account.smtp.port,
					secure: account.smtp.secure,
					auth: {
						user: account.user,
						pass: account.pass,
					},
				});

				this.client = transporter;
			})
			.catch((error) => console.error(error));
	}

	async sendMail(
		to: string,
		subject: string,
		variables: any,
		path: string
	): Promise<void> {
		const templateFileContent = fs.readFileSync(path).toString('utf-8');

		const templateParse = handlebars.compile(templateFileContent);

		const templateHTML = templateParse(variables);

		const message = await this.client.sendMail({
			to,
			from: 'Rentx <noreplay@rentx.com>',
			subject,
			html: templateHTML,
		});

		console.log('Message sent: %s', message.messageId);

		console.log('Preview URL: %s', getTestMessageUrl(message));
	}
}

export { EtherealMailProvider };
