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

		return userToken;
	}
}

export { UsersTokensRepository };
