import { inject, injectable } from 'tsyringe';

import { ICreateSpecificationDTO } from '../../dtos';
import { ISpecificationsRepository } from '../../repositories';

@injectable()
class CreateSpecificationUseCase {
	constructor(
		@inject('SpecificationsRepository')
		private specificationsRepository: ISpecificationsRepository
	) {}

	async execute(data: ICreateSpecificationDTO): Promise<void> {
		const specificationAlreadyExists =
			await this.specificationsRepository.findByName(data.name);

		if (specificationAlreadyExists)
			throw new Error('Specification already exists');

		await this.specificationsRepository.create({ ...data });
	}
}

export { CreateSpecificationUseCase };
