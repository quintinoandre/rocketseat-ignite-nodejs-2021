import { inject, injectable } from 'tsyringe';

import { IUpdateDeliverymanDTO } from '../../dtos';
import { IDelivery } from '../../infra/prisma/entities';
import { IDeliveriesRepository } from '../../repositories';

@injectable()
class UpdateDeliverymanUseCase {
	constructor(
		@inject('DeliveriesRepository')
		private deliveriesRepository: IDeliveriesRepository
	) {}

	async execute({
		id_delivery,
		id_deliveryman,
	}: IUpdateDeliverymanDTO): Promise<IDelivery> {
		const delivery = await this.deliveriesRepository.update({
			id_delivery,
			id_deliveryman,
		});

		return delivery;
	}
}

export { UpdateDeliverymanUseCase };
