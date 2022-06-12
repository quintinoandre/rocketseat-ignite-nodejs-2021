import { ICreateUserTokenDTO } from '@modules/accounts/dtos';
import { UserTokens } from '@modules/accounts/infra/typeorm/entities';

interface IUsersTokensRepository {
	create(data: ICreateUserTokenDTO): Promise<UserTokens>;
}

export { IUsersTokensRepository };
