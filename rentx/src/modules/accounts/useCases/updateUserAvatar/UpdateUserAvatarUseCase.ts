import { inject, injectable } from 'tsyringe';

import { IUpdateUserAvatarDTO } from '@modules/accounts/dtos';
import { IUsersRepository } from '@modules/accounts/repositories';
import { IStorageProvider } from '@shared/container/providers/StorageProvider';

@injectable()
class UpdateUserAvatarUseCase {
	constructor(
		@inject('UsersRepository')
		private usersRepository: IUsersRepository,
		@inject('StorageProvider')
		private storageProvider: IStorageProvider
	) {}

	async execute(data: IUpdateUserAvatarDTO): Promise<void> {
		const user = await this.usersRepository.findById(data.user_id);

		if (user.avatar) await this.storageProvider.delete(user.avatar, 'avatar');

		await this.storageProvider.save(data.avatar_file, 'avatar');

		user.avatar = data.avatar_file;

		await this.usersRepository.create(user);
	}
}

export { UpdateUserAvatarUseCase };
