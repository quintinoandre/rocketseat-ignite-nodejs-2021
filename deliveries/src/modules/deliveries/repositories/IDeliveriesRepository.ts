import {
	ICreateDeliveryDTO,
	IUpdateDeliverymanDTO,
	IUpdateEndDateDTO,
} from '../dtos';
import { IDelivery } from '../infra/prisma/entities';

interface IDeliveriesRepository {
	create(data: ICreateDeliveryDTO): Promise<IDelivery>;
	findAllAvailable(): Promise<IDelivery[]>;
	updateDeliveryman(data: IUpdateDeliverymanDTO): Promise<IDelivery>;
	updateEndDate(data: IUpdateEndDateDTO): Promise<IDelivery>;
}

export { IDeliveriesRepository };
