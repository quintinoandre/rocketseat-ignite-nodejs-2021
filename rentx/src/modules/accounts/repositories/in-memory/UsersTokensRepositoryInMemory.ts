import { ICreateUserTokenDTO } from '@modules/accounts/dtos';
import { UserTokens } from '@modules/accounts/infra/typeorm/entities';
import { IUsersTokensRepository } from '@modules/accounts/repositories';

class UsersTokensRepositoryInMemory implements IUsersTokensRepository {
	private usersTokens: Array<UserTokens> = [];

	async create(data: ICreateUserTokenDTO): Promise<UserTokens> {
		const userToken = new UserTokens();

		Object.assign(userToken, data);

		this.usersTokens.push(userToken);

		return userToken;
	}

	async findByUserIdAndRefreshToken(
		user_id: string,
		refresh_token: string
	): Promise<UserTokens> {
		const userToken = this.usersTokens.find(
			(item) => item.user_id === user_id && item.refresh_token === refresh_token
		);

		return userToken;
	}

	async deleteById(id: string): Promise<void> {
		const userTokenIndex = this.usersTokens.findIndex(
			(userToken) => userToken.id === id
		);

		this.usersTokens.splice(userTokenIndex, 1);
	}

	async findByRefreshToken(refresh_token: string): Promise<UserTokens> {
		const userToken = this.usersTokens.find(
			(item) => item.refresh_token === refresh_token
		);

		return userToken;
	}
}

export { UsersTokensRepositoryInMemory };
