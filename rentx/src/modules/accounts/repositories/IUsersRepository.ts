import { ICreateUserDTO } from '@modules/accounts/dtos';
import { User } from '@modules/accounts/infra/typeorm/entities';

interface IUsersRepository {
	create(data: ICreateUserDTO): Promise<void>;
	findByEmail(email: string): Promise<User>;
	findById(id: string): Promise<User>;
}

export { IUsersRepository };
