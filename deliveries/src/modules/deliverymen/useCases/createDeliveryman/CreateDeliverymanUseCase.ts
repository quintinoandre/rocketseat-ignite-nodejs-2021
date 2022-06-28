import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../shared/erros';
import { ICreateDeliverymanDTO } from '../../dtos';
import { DeliverymanMap } from '../../mappers';
import { IDeliverymenRepository } from '../../repositories';

@injectable()
class CreateDeliverymanUseCase {
	constructor(
		@inject('DeliverymenRepository')
		private deliverymenRepository: IDeliverymenRepository
	) {}

	async execute({
		username,
		password,
	}: ICreateDeliverymanDTO): Promise<DeliverymanMap> {
		const deliverymanExist = await this.deliverymenRepository.findByUsername(
			username
		);

		if (deliverymanExist) throw new AppError('Deliveryman already exists'); //! status 400 - Bad request

		const passwordHash = await hash(password, 10);

		const deliveryman = await this.deliverymenRepository.create({
			username,
			password: passwordHash,
		});

		return DeliverymanMap.toDTO(deliveryman);
	}
}

export { CreateDeliverymanUseCase };
