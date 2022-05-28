import { inject, injectable } from 'tsyringe';

import { ICreateUserDTO } from '../../dtos';
import { IUsersRepository } from '../../repositories';

@injectable()
class CreateUserUseCase {
	constructor(
		@inject('UsersRepository')
		private usersRepository: IUsersRepository
	) {}

	async execute(data: ICreateUserDTO): Promise<void> {
		await this.usersRepository.create({ ...data });
	}
}

export { CreateUserUseCase };
