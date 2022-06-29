import { inject, injectable } from 'tsyringe';

import { IUpdateEndDateDTO } from '../../dtos';
import { IDelivery } from '../../infra/prisma/entities';
import { IDeliveriesRepository } from '../../repositories';

@injectable()
class UpdateEndDateUseCase {
	constructor(
		@inject('DeliveriesRepository')
		private deliveriesRepository: IDeliveriesRepository
	) {}

	async execute({
		id_delivery,
		id_deliveryman,
	}: IUpdateEndDateDTO): Promise<IDelivery> {
		const delivery = await this.deliveriesRepository.updateEndDate({
			id_delivery,
			id_deliveryman,
		});

		return delivery;
	}
}

export { UpdateEndDateUseCase };
