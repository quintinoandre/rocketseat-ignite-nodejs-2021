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

interface ITokenResponse {
	token: string;
	refresh_token: string;
}

@injectable()
class RefreshTokenUseCase {
	constructor(
		@inject('UsersTokensRepository')
		private usersTokensRepository: IUsersTokensRepository,
		@inject('DayjsDateProvider')
		private dateProvider: IDateProvider
	) {}

	async execute(data: IRefreshTokenDTO): Promise<ITokenResponse> {
		const {
			secretRefreshToken,
			expires_refresh_token_days,
			expiresInRefreshToken,
			secretToken,
			expiresInToken,
		} = auth;

		const { email, sub: user_id } = verify(
			data.token,
			secretRefreshToken
		) as IPayload;

		const userToken =
			await this.usersTokensRepository.findByUserIdAndRefreshToken(
				user_id,
				data.token
			);

		if (!userToken) throw new AppError('Refresh token does not exists', 404); //! status 404 - Not found

		await this.usersTokensRepository.deleteById(userToken.id);

		const expires_date = this.dateProvider.addDays(expires_refresh_token_days);

		const refresh_token = sign({ email }, secretRefreshToken, {
			subject: user_id,
			expiresIn: expiresInRefreshToken,
		});

		await this.usersTokensRepository.create({
			refresh_token,
			user_id,
			expires_date,
		});

		const newToken = sign({}, secretToken, {
			subject: user_id,
			expiresIn: expiresInToken,
		});

		return { refresh_token, token: newToken };
	}
}

export { RefreshTokenUseCase };
