import { inject, injectable } from 'tsyringe';

import { IProfileUserDTO, IUserMapDTO } from '@modules/accounts/dtos';
import { UserMap } from '@modules/accounts/mappers';
import { IUsersRepository } from '@modules/accounts/repositories';

@injectable()
class ProfileUserUseCase {
	constructor(
		@inject('UsersRepository')
		private usersRepository: IUsersRepository
	) {}

	async execute(data: IProfileUserDTO): Promise<IUserMapDTO> {
		const user = await this.usersRepository.findById(data.user_id);

		return UserMap.toDTO(user);
	}
}

export { ProfileUserUseCase };
