import { IDelivery } from '../../../../deliveries/infra/prisma/entities';

interface IDeliveryman {
	id: string;
	username: string;
	password: string;
	deliveries?: Array<IDelivery>;
}

export { IDeliveryman };
