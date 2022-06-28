import { instanceToInstance } from 'class-transformer';

import { IDeliverymanMapDTO } from '../dtos';
import { IDeliveryman } from '../infra/prisma/entities';

class DeliverymanMap {
	static toDTO({ id, username }: IDeliveryman): IDeliverymanMapDTO {
		const deliveryman = instanceToInstance({ id, username });

		return deliveryman;
	}
}

export { DeliverymanMap };
