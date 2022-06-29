import { ICreateDeliveryDTO, IUpdateDeliverymanDTO } from '../dtos';
import { IDelivery } from '../infra/prisma/entities';

interface IDeliveriesRepository {
	create(data: ICreateDeliveryDTO): Promise<IDelivery>;
	findAllAvailable(): Promise<IDelivery[]>;
	update(data: IUpdateDeliverymanDTO): Promise<IDelivery>;
}

export { IDeliveriesRepository };
