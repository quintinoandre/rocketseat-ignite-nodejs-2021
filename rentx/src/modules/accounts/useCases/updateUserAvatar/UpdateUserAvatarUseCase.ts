import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '../../repositories';

interface IRequest {
	user_id: string;
	avatar_file: string;
}

@injectable()
class UpdateUserAvatarUseCase {
	constructor(
		@inject('UsersRepository')
		private usersRepository: IUsersRepository
	) {}

	async execute(data: IRequest): Promise<void> {
		const user = await this.usersRepository.findById(data.user_id);

		user.avatar = data.avatar_file;

		await this.usersRepository.create(user);
	}
}

export { UpdateUserAvatarUseCase };
