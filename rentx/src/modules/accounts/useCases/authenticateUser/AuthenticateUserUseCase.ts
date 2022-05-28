import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../erros';
import {
	IAuthenticateUserRequestDTO,
	IAuthenticateUserResponseDTO,
} from '../../dtos';
import { IUsersRepository } from '../../repositories';

@injectable()
class AuthenticateUserUseCase {
	constructor(
		@inject('UsersRepository')
		private usersRepository: IUsersRepository
	) {}

	async execute(
		data: IAuthenticateUserRequestDTO
	): Promise<IAuthenticateUserResponseDTO> {
		const user = await this.usersRepository.findByEmail(data.email);

		if (!user) throw new AppError('Email or password incorrect'); //! Bad Request

		const passwordMatched = await compare(data.password, user.password);

		if (!passwordMatched) throw new AppError('Email or password incorrect'); //! Bad Request

		const token = sign({}, 'hmrRKeqsipSK74YFqqA5k9Ynnes3pmnQ', {
			subject: user.id,
			expiresIn: '1d',
		});

		const tokenReturn: IAuthenticateUserResponseDTO = {
			token,
			user: { name: user.name, email: user.email },
		};

		return tokenReturn;
	}
}

export { AuthenticateUserUseCase };
