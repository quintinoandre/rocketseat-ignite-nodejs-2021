import { inject, injectable } from 'tsyringe';

import { deleteFile } from '../../../../utils';
import { IUpdateUserAvatarDTO } from '../../dtos';
import { IUsersRepository } from '../../repositories';

@injectable()
class UpdateUserAvatarUseCase {
	constructor(
		@inject('UsersRepository')
		private usersRepository: IUsersRepository
	) {}

	async execute(data: IUpdateUserAvatarDTO): Promise<void> {
		const user = await this.usersRepository.findById(data.user_id);

		if (user.avatar) await deleteFile(`./tmp/avatar/${user.avatar}`);

		user.avatar = data.avatar_file;

		await this.usersRepository.create(user);
	}
}

export { UpdateUserAvatarUseCase };
