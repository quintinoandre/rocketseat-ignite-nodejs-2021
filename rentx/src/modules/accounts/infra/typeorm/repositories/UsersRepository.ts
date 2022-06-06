import { getRepository, Repository } from 'typeorm';

import { ICreateUserDTO } from '@modules/accounts/dtos';
import { User } from '@modules/accounts/infra/typeorm/entities';
import { IUsersRepository } from '@modules/accounts/repositories';

class UsersRepository implements IUsersRepository {
	constructor(private repository: Repository<User> = getRepository(User)) {}

	async create(data: ICreateUserDTO): Promise<void> {
		const user = this.repository.create(data);

		await this.repository.save(user);

		/* const id = uuidV4();

		const { name, password, email, driver_license } = data;

		await this.repository.query(`
		INSERT INTO users
		(id, name, password, email, driver_license)
		VALUES
		('${id}', '${name}', '${password}', '${email}', '${driver_license}');
		`); */
	}

	async findByEmail(email: string): Promise<User> {
		const user = await this.repository.findOne({ email });

		return user;

		/* const user = await this.repository.query(`
		SELECT * FROM users
		WHERE email = '${email}';
		`);

		return user; */
	}

	async findById(id: string): Promise<User> {
		const user = await this.repository.findOne(id);

		return user;

		/* const user = await this.repository.query(`
		SELECT * FROM users
		WHERE id = '${id}';
		`);

		return user; */
	}
}

export { UsersRepository };
