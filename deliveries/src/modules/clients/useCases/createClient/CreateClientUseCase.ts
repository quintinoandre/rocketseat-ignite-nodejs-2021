import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../shared/erros';
import { ICreateClientDTO } from '../../dtos';
import { ClientMap } from '../../mappers';
import { IClientsRepository } from '../../repositories';

@injectable()
class CreateClientUseCase {
	constructor(
		@inject('ClientsRepository')
		private clientsRepository: IClientsRepository
	) {}

	async execute({ username, password }: ICreateClientDTO) {
		const clientExist = await this.clientsRepository.findByUsername(username);

		if (clientExist) throw new AppError('Client already exists'); //! status 400 - Bad request

		const passwordHash = await hash(password, 10);

		const client = await this.clientsRepository.create({
			username,
			password: passwordHash,
		});

		return ClientMap.toDTO(client);
	}
}

export { CreateClientUseCase };
