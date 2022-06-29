import { inject, injectable } from 'tsyringe';

import { IFindAllDeliveriesDTO } from '../../dtos';
import { DeliverymanMap } from '../../mappers';
import { IDeliverymenRepository } from '../../repositories';

@injectable()
class FindAllDeliveriesUseCase {
	constructor(
		@inject('DeliverymenRepository')
		private deliverymenRepository: IDeliverymenRepository
	) {}

	async execute({
		id_deliveryman,
	}: IFindAllDeliveriesDTO): Promise<DeliverymanMap> {
		const deliveryman = await this.deliverymenRepository.findAllDeliveries({
			id_deliveryman,
		});

		return DeliverymanMap.toDTO(deliveryman);
	}
}

export { FindAllDeliveriesUseCase };
