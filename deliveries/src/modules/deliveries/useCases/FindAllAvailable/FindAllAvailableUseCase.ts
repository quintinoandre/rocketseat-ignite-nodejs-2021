import { inject, injectable } from 'tsyringe';

import { IDelivery } from '../../infra/prisma/entities';
import { IDeliveriesRepository } from '../../repositories';

@injectable()
class FindAllAvailableUseCase {
	constructor(
		@inject('DeliveriesRepository')
		private deliveriesRepository: IDeliveriesRepository
	) {}

	async execute(): Promise<IDelivery[]> {
		const deliveries = await this.deliveriesRepository.findAllAvailable();

		return deliveries;
	}
}

export { FindAllAvailableUseCase };
