import { getRepository, Repository } from 'typeorm';

import { ICreateUserDTO } from '../../dtos';
import { User } from '../../entities';
import { IUsersRepository } from '../IUsersRepository';

class UsersRepository implements IUsersRepository {
	constructor(private repository: Repository<User> = getRepository(User)) {}

	async create(data: ICreateUserDTO): Promise<void> {
		const user = this.repository.create({ ...data });

		await this.repository.save(user);
	}

	async findByEmail(email: string): Promise<User> {
		const user = await this.repository.findOne({ email });

		return user;
	}

	async findById(id: string): Promise<User> {
		const user = await this.repository.findOne(id);

		return user;
	}
}

export { UsersRepository };
