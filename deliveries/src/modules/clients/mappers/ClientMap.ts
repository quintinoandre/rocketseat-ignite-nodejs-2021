import { instanceToInstance } from 'class-transformer';

import { IClientMapDTO } from '../dtos';
import { IClient } from '../infra/prisma/entities';

class ClientMap {
	static toDTO({ id, username, deliveries }: IClient): IClientMapDTO {
		const client = instanceToInstance({ id, username, deliveries });

		return client;
	}
}

export { ClientMap };
