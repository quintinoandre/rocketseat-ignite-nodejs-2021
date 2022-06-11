import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';

import { ICreateUserDTO } from '@modules/accounts/dtos';
import { IUsersRepository } from '@modules/accounts/repositories';
import { AppError } from '@shared/erros';

@injectable()
class CreateUserUseCase {
	constructor(
		@inject('UsersRepository')
		private usersRepository: IUsersRepository
	) {}

	async execute(data: ICreateUserDTO): Promise<void> {
		const userAlreadyExists = await this.usersRepository.findByEmail(
			data.email
		);

		if (userAlreadyExists) throw new AppError('User already exists'); //! status 400 - Bad request

		const passwordHash = await hash(data.password, 8);

		await this.usersRepository.create({ ...data, password: passwordHash });
	}
}

export { CreateUserUseCase };
