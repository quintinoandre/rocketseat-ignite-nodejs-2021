import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';

import { IResetPasswordUserDTO } from '@modules/accounts/dtos';
import {
	IUsersRepository,
	IUsersTokensRepository,
} from '@modules/accounts/repositories';
import { IDateProvider } from '@shared/container/providers/DateProvider';
import { AppError } from '@shared/erros';

@injectable()
class ResetPasswordUserUseCase {
	constructor(
		@inject('UsersTokensRepository')
		private usersTokensRepository: IUsersTokensRepository,
		@inject('DayjsDateProvider')
		private dateProvider: IDateProvider,
		@inject('UsersRepository')
		private usersRepository: IUsersRepository
	) {}

	async execute(data: IResetPasswordUserDTO): Promise<void> {
		const userToken = await this.usersTokensRepository.findByRefreshToken(
			data.token
		);

		if (!userToken) throw new AppError('User token does not exists', 404); //! status 404 - Not Found

		if (
			this.dateProvider.compareIfBefore(
				userToken.expires_date,
				this.dateProvider.dateNow()
			)
		)
			throw new AppError('Token expired', 401); //! status 401 - Unauthorized

		const user = await this.usersRepository.findById(userToken.user_id);

		user.password = await hash(data.password, 8);

		await this.usersRepository.create(user);

		await this.usersTokensRepository.deleteById(userToken.id);
	}
}

export { ResetPasswordUserUseCase };
