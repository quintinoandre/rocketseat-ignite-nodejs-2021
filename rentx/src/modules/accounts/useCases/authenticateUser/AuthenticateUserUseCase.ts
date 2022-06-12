import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import auth from '@config/auth';
import {
	IAuthenticateUserRequestDTO,
	IAuthenticateUserResponseDTO,
} from '@modules/accounts/dtos';
import {
	IUsersRepository,
	IUsersTokensRepository,
} from '@modules/accounts/repositories';
import { IDateProvider } from '@shared/container/providers/DateProvider';
import { AppError } from '@shared/erros';

@injectable()
class AuthenticateUserUseCase {
	constructor(
		@inject('UsersRepository')
		private usersRepository: IUsersRepository,
		@inject('UsersTokensRepository')
		private usersTokensRepository: IUsersTokensRepository,
		@inject('DayjsDateProvider')
		private dateProvider: IDateProvider
	) {}

	async execute(
		data: IAuthenticateUserRequestDTO
	): Promise<IAuthenticateUserResponseDTO> {
		const user = await this.usersRepository.findByEmail(data.email);

		if (!user) throw new AppError('Email or password incorrect'); //! status 400 - Bad request

		const passwordMatched = await compare(data.password, user.password);

		if (!passwordMatched) throw new AppError('Email or password incorrect'); //! status 400 - Bad request

		const {
			secretToken,
			expiresInToken,
			secretRefreshToken,
			expiresInRefreshToken,
			expires_refresh_token_days,
		} = auth;

		const token = sign({}, secretToken, {
			subject: user.id,
			expiresIn: expiresInToken,
		});

		const refresh_token = sign({ email: data.email }, secretRefreshToken, {
			subject: user.id,
			expiresIn: expiresInRefreshToken,
		});

		const refresh_token_expires_date = this.dateProvider.addDays(
			expires_refresh_token_days
		);

		await this.usersTokensRepository.create({
			user_id: user.id,
			refresh_token,
			expires_date: refresh_token_expires_date,
		});

		const tokenReturn: IAuthenticateUserResponseDTO = {
			token,
			user: { name: user.name, email: user.email },
			refreshToken: refresh_token,
		};

		return tokenReturn;
	}
}

export { AuthenticateUserUseCase };
