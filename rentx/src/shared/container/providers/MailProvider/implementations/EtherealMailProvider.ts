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

	async sendMail(to: string, subject: string, body: string): Promise<void> {
		const message = await this.client.sendMail({
			to,
			from: 'Rentx <noreplay@rentx.com>',
			subject,
			text: body,
			html: body,
		});

		console.log('Message sent: %s', message.messageId);

		console.log('Preview URL: %s', getTestMessageUrl(message));
	}
}

export { EtherealMailProvider };
