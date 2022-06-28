import { ICreateDeliverymanDTO } from '../dtos';
import { IDeliveryman } from '../infra/prisma/entities';

interface IDeliverymenRepository {
	create(data: ICreateDeliverymanDTO): Promise<IDeliveryman>;
	findByUsername(username: string): Promise<IDeliveryman | null>;
}

export { IDeliverymenRepository };
