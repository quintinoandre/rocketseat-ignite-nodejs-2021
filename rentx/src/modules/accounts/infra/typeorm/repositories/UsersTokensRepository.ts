import { getRepository, Repository } from 'typeorm';

import { ICreateUserTokenDTO } from '@modules/accounts/dtos';
import { UserTokens } from '@modules/accounts/infra/typeorm/entities';
import { IUsersTokensRepository } from '@modules/accounts/repositories';

class UsersTokensRepository implements IUsersTokensRepository {
	constructor(
		private repository: Repository<UserTokens> = getRepository(UserTokens)
	) {}

	async create(data: ICreateUserTokenDTO): Promise<UserTokens> {
		const userToken = this.repository.create(data);

		await this.repository.save(userToken);

		/* const id = uuidV4();

		const { user_id, refresh_token, expires_date } = data;

		const [userToken] = await this.repository.query(`
			INSERT INTO users_tokens
			(id, user_id, refresh_token, expires_date)
			VALUES
			('${id}', '${user_id}', '${refresh_token}', '${expires_date}')
			RETURNING *;
		`); */

		return userToken;
	}

	async findByUserIdAndRefreshToken(
		user_id: string,
		refresh_token: string
	): Promise<UserTokens> {
		const userToken = await this.repository.findOne({
			user_id,
			refresh_token,
		});

		/* const userToken = await this.repository.query(`
			SELECT * FROM users_tokens
			WHERE user_id = '${user_id}'
			AND refresh_token = '${refresh_token}';
			`); */

		return userToken;
	}

	async deleteById(id: string): Promise<void> {
		await this.repository.delete(id);

		/* await this.repository.query(`
			DELETE FROM users_tokens
			WHERE id = '${id}';
			`); */
	}

	async findByRefreshToken(refresh_token: string): Promise<UserTokens> {
		const userToken = await this.repository.findOne({ refresh_token });

		/* const userToken = await this.repository.query(`
			SELECT * FROM users_tokens
			WHERE refresh_token = '${refresh_token}';
		`); */

		return userToken;
	}
}

export { UsersTokensRepository };
