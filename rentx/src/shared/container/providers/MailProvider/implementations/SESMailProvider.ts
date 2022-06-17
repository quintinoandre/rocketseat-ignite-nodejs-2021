import { SES } from 'aws-sdk';
import fs from 'fs';
import handlebars from 'handlebars';
import { Transporter, createTransport } from 'nodemailer';
import { injectable } from 'tsyringe';

import { IMailProvider } from '@shared/container/providers/MailProvider';

const {
	env: { AWS_REGION },
} = process;

@injectable()
class SESMailProvider implements IMailProvider {
	private client: Transporter;

	constructor() {
		this.client = createTransport({
			SES: new SES({
				apiVersion: '2010-12-01',
				region: AWS_REGION,
			}),
		});
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

		await this.client.sendMail({
			to,
			from: 'Rentx <daniele@rocketseat.com.br>',
			subject,
			html: templateHTML,
		});
	}
}

export { SESMailProvider };
