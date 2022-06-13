import { ICreateUserTokenDTO } from '@modules/accounts/dtos';
import { UserTokens } from '@modules/accounts/infra/typeorm/entities';

interface IUsersTokensRepository {
	create(data: ICreateUserTokenDTO): Promise<UserTokens>;
	findByUserIdAndRefreshToken(
		user_id: string,
		refresh_token: string
	): Promise<UserTokens>;
	deleteById(id: string): Promise<void>;
	findByRefreshToken(refresh_token: string): Promise<UserTokens>;
}

export { IUsersTokensRepository };
