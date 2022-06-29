import { ICreateClientDTO, IFindAllDeliveriesDTO } from '../dtos';
import { IClient } from '../infra/prisma/entities';

interface IClientsRepository {
	create(data: ICreateClientDTO): Promise<IClient>;
	findByUsername(username: string): Promise<IClient | null>;
	findAllDeliveries(data: IFindAllDeliveriesDTO): Promise<IClient>;
}

export { IClientsRepository };
