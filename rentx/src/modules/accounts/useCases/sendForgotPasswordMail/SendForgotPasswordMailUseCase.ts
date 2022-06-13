import { inject, injectable } from 'tsyringe';
import { v4 as uuidV4 } from 'uuid';

import { ISendForgotPasswordMailDTO } from '@modules/accounts/dtos';
import {
	IUsersRepository,
	IUsersTokensRepository,
} from '@modules/accounts/repositories';
import { IDateProvider } from '@shared/container/providers/DateProvider';
import { IMailProvider } from '@shared/container/providers/MailProvider';
import { AppError } from '@shared/erros';

@injectable()
class SendForgotPasswordMailUseCase {
	constructor(
		@inject('UsersRepository')
		private usersRepository: IUsersRepository,
		@inject('UsersTokensRepository')
		private usersTokensRepository: IUsersTokensRepository,
		@inject('DayjsDateProvider')
		private dateProvider: IDateProvider,
		@inject('EtherealMailProvider')
		private mailProvider: IMailProvider
	) {}

	async execute(data: ISendForgotPasswordMailDTO): Promise<void> {
		const user = await this.usersRepository.findByEmail(data.email);

		if (!user) throw new AppError('User does not exists', 404); //! status 404 - Not found

		const token = uuidV4();

		const expires_date = this.dateProvider.addHours(3);

		await this.usersTokensRepository.create({
			refresh_token: token,
			user_id: user.id,
			expires_date,
		});

		await this.mailProvider.sendMail(
			data.email,
			'Password recovery',
			`The link to the reset is ${token}`
		);
	}
}

export { SendForgotPasswordMailUseCase };
