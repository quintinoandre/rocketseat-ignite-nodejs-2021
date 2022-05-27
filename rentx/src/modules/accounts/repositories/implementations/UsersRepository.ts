import { getRepository, Repository } from 'typeorm';

import { ICreateUserDTO } from '../../dtos';
import { User } from '../../entities';
import { IUsersRepository } from '../IUsersRepository';

class UsersRepository implements IUsersRepository {
	constructor(private repository: Repository<User> = getRepository(User)) {}

	async create({
		name,
		username,
		password,
		email,
		driver_license,
	}: ICreateUserDTO): Promise<void> {
		const user = this.repository.create({
			name,
			username,
			password,
			email,
			driver_license,
		});

		await this.repository.save(user);
	}
}

export { UsersRepository };
