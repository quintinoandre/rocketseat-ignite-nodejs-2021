import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import auth from '../../../../config/auth';
import { AppError } from '../../../../shared/erros';
import { IClientsRepository } from '../../../clients/repositories';
import { IAuthenticateClientDTO } from '../../dtos';

@injectable()
class AuthenticateClientUseCase {
	constructor(
		@inject('ClientsRepository')
		private clientsRepository: IClientsRepository
	) {}

	async execute({
		username,
		password,
	}: IAuthenticateClientDTO): Promise<string> {
		const client = await this.clientsRepository.findByUsername(username);

		if (!client) throw new AppError('Username or password invalid'); //! status 400 - Bad request

		const passwordMatched = await compare(password, client.password);

		if (!passwordMatched) throw new AppError('Username or password invalid'); //! status 400 - Bad request

		const secretToken = auth.secretToken as string;

		const token = sign({ username }, secretToken, {
			subject: client.id,
			expiresIn: auth.expiresIn,
		});

		return token;
	}
}

export { AuthenticateClientUseCase };
