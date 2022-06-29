import { instanceToInstance } from 'class-transformer';

import { IDeliverymanMapDTO } from '../dtos';
import { IDeliveryman } from '../infra/prisma/entities';

class DeliverymanMap {
	static toDTO({ id, username, deliveries }: IDeliveryman): IDeliverymanMapDTO {
		const deliveryman = instanceToInstance({ id, username, deliveries });

		return deliveryman;
	}
}

export { DeliverymanMap };
