import { IDelivery } from '../../deliveries/infra/prisma/entities';

interface IClientMapDTO {
	id: string;
	username: string;
	deliveries?: Array<IDelivery>;
}

export { IClientMapDTO };
