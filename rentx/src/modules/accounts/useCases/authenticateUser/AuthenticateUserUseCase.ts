import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../erros';
import { IUsersRepository } from '../../repositories';

interface IRequest {
	email: string;
	password: string;
}

interface IResponse {
	user: {
		name: string;
		email: string;
	};
	token: string;
}

@injectable()
class AuthenticateUserUseCase {
	constructor(
		@inject('UsersRepository')
		private usersRepository: IUsersRepository
	) {}

	async execute(data: IRequest): Promise<IResponse> {
		const user = await this.usersRepository.findByEmail(data.email);

		if (!user) throw new AppError('Email or password incorrect'); //! Bad Request

		const passwordMatched = await compare(data.password, user.password);

		if (!passwordMatched) throw new AppError('Email or password incorrect'); //! Bad Request

		const token = sign({}, 'hmrRKeqsipSK74YFqqA5k9Ynnes3pmnQ', {
			subject: user.id,
			expiresIn: '1d',
		});

		const tokenReturn: IResponse = {
			token,
			user: { name: user.name, email: user.email },
		};

		return tokenReturn;
	}
}

export { AuthenticateUserUseCase };
