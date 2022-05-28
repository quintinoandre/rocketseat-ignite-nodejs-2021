import { ICreateUserDTO } from '../dtos';
import { User } from '../entities';

interface IUsersRepository {
	create(data: ICreateUserDTO): Promise<void>;
	findByEmail(email: string): Promise<User>;
}

export { IUsersRepository };
