import { instanceToInstance } from 'class-transformer';

import { IUserMapDTO } from '@modules/accounts/dtos';
import { User } from '@modules/accounts/infra/typeorm/entities';

class UserMap {
	static toDTO({
		id,
		name,
		email,
		avatar,
		driver_license,
		avatar_url,
	}: User): IUserMapDTO {
		const user = instanceToInstance({
			id,
			name,
			email,
			avatar,
			driver_license,
			avatar_url,
		});

		return user;
	}
}

export { UserMap };
