import { inject, injectable } from 'tsyringe';

import { IFindAllDeliveriesDTO } from '../../dtos';
import { ClientMap } from '../../mappers';
import { IClientsRepository } from '../../repositories';

@injectable()
class FindAllDeliveriesUseCase {
	constructor(
		@inject('ClientsRepository')
		private clientsRepository: IClientsRepository
	) {}

	async execute({ id_client }: IFindAllDeliveriesDTO): Promise<ClientMap> {
		const client = await this.clientsRepository.findAllDeliveries({
			id_client,
		});

		return ClientMap.toDTO(client);
	}
}

export { FindAllDeliveriesUseCase };
