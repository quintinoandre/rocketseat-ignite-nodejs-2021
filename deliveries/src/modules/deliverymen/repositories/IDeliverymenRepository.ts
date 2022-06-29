import { ICreateDeliverymanDTO, IFindAllDeliveriesDTO } from '../dtos';
import { IDeliveryman } from '../infra/prisma/entities';

interface IDeliverymenRepository {
	create(data: ICreateDeliverymanDTO): Promise<IDeliveryman>;
	findByUsername(username: string): Promise<IDeliveryman | null>;
	findAllDeliveries(data: IFindAllDeliveriesDTO): Promise<IDeliveryman>;
}

export { IDeliverymenRepository };
