import { ICreateDeliveryDTO } from '../dtos';
import { IDelivery } from '../infra/prisma/entities';

interface IDeliveriesRepository {
	create(data: ICreateDeliveryDTO): Promise<IDelivery>;
	findAllAvailable(): Promise<IDelivery[]>;
}

export { IDeliveriesRepository };
