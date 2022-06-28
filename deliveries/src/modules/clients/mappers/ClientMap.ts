import { instanceToInstance } from 'class-transformer';

import { IClientMapDTO } from '../dtos';
import { IClient } from '../infra/prisma/entities';

class ClientMap {
	static toDTO({ id, username }: IClient): IClientMapDTO {
		const client = instanceToInstance({ id, username });

		return client;
	}
}

export { ClientMap };
