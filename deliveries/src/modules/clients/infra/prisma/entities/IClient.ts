import { IDelivery } from '../../../../deliveries/infra/prisma/entities';

interface IClient {
	id: string;
	username: string;
	password: string;
	deliveries?: Array<IDelivery>;
}

export { IClient };
