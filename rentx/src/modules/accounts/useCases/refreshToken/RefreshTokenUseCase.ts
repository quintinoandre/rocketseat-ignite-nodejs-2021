import { sign, verify } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import auth from '@config/auth';
import { IRefreshTokenDTO } from '@modules/accounts/dtos';
import { IUsersTokensRepository } from '@modules/accounts/repositories';
import { IDateProvider } from '@shared/container/providers/DateProvider';
import { AppError } from '@shared/erros';

interface IPayload {
	sub: string;
	email: string;
}

@injectable()
class RefreshTokenUseCase {
	constructor(
		@inject('UsersTokensRepository')
		private usersTokensRepository: IUsersTokensRepository,
		@inject('DayjsDateProvider')
		private dateProvider: IDateProvider
	) {}

	async execute(data: IRefreshTokenDTO): Promise<string> {
		const { email, sub: user_id } = verify(
			data.token,
			auth.secretRefreshToken
		) as IPayload;

		const userToken =
			await this.usersTokensRepository.findByUserIdAndRefreshToken(
				user_id,
				data.token
			);

		if (!userToken) throw new AppError('Refresh token does not exists', 404); //! status 404 - Not found

		await this.usersTokensRepository.deleteById(userToken.id);

		const expires_date = this.dateProvider.addDays(
			auth.expires_refresh_token_days
		);

		const refresh_token = sign({ email }, auth.secretRefreshToken, {
			subject: user_id,
			expiresIn: auth.expiresInRefreshToken,
		});

		await this.usersTokensRepository.create({
			refresh_token,
			user_id,
			expires_date,
		});

		return refresh_token;
	}
}

export { RefreshTokenUseCase };
