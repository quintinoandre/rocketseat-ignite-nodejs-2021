import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../erros';
import { ICreateUserDTO } from '../../dtos';
import { IUsersRepository } from '../../repositories';

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

		if (userAlreadyExists) throw new AppError('User already exists'); //! Bad Request

		const passwordHash = await hash(data.password, 8);

		await this.usersRepository.create({ ...data, password: passwordHash });
	}
}

export { CreateUserUseCase };
