import { inject, injectable } from 'tsyringe';

import { ICreateDeliveryDTO } from '../../dtos';
import { IDelivery } from '../../infra/prisma/entities';
import { IDeliveriesRepository } from '../../repositories';

@injectable()
class CreateDeliveryUseCase {
	constructor(
		@inject('DeliveriesRepository')
		private deliveriesRepository: IDeliveriesRepository
	) {}

	async execute({
		item_name,
		id_client,
	}: ICreateDeliveryDTO): Promise<IDelivery> {
		const delivery = await this.deliveriesRepository.create({
			item_name,
			id_client,
		});

		return delivery;
	}
}

export { CreateDeliveryUseCase };
