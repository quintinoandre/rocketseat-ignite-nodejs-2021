import { ICreateUserDTO } from '@modules/accounts/dtos';
import { User } from '@modules/accounts/entities';

import { IUsersRepository } from '../IUsersRepository';

class UsersRepositoryInMemory implements IUsersRepository {
	private users: Array<User> = [];

	async create(data: ICreateUserDTO): Promise<void> {
		const user = new User();

		Object.assign(user, { ...data });

		this.users.push(user);
	}

	async findByEmail(email: string): Promise<User> {
		return this.users.find((user) => user.email === email);
	}

	async findById(id: string): Promise<User> {
		return this.users.find((user) => user.id === id);
	}
}

export { UsersRepositoryInMemory };
