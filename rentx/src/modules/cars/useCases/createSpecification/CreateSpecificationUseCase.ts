import { inject, injectable } from 'tsyringe';

import { ICreateSpecificationDTO } from '@modules/cars/dtos';
import { ISpecificationsRepository } from '@modules/cars/repositories';
import { AppError } from '@shared/erros';

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
			throw new AppError('Specification already exists'); //! status 400 - Bad request

		await this.specificationsRepository.create(data);
	}
}

export { CreateSpecificationUseCase };
