import { ICreateClientDTO } from '../dtos';
import { IClient } from '../infra/prisma/entities';

interface IClientsRepository {
	create(data: ICreateClientDTO): Promise<IClient>;
	findByUsername(username: string): Promise<IClient | null>;
}

export { IClientsRepository };
