import { IDelivery } from '../../deliveries/infra/prisma/entities';

interface IDeliverymanMapDTO {
	id: string;
	username: string;
	deliveries?: Array<IDelivery>;
}

export { IDeliverymanMapDTO };
