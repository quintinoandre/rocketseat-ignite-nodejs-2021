import { inject, injectable } from 'tsyringe';

import { ICreateCarSpecificationDTO } from '@modules/cars/dtos';
import { Car } from '@modules/cars/infra/typeorm/entities';
import {
	ICarsRepository,
	ISpecificationsRepository,
} from '@modules/cars/repositories';
import { AppError } from '@shared/erros';

@injectable()
class CreateCarSpecificationUseCase {
	constructor(
		@inject('CarsRepository')
		private carsRepository: ICarsRepository,
		@inject('SpecificationsRepository')
		private specificationsRepository: ISpecificationsRepository
	) {}

	async execute(data: ICreateCarSpecificationDTO): Promise<Car> {
		const carExists = await this.carsRepository.findById(data.car_id);

		if (!carExists) throw new AppError('Car does not exists', 404); //! status 404 - not found

		const specifications = await this.specificationsRepository.findByIds(
			data.specifications_id
		);

		carExists.specifications = specifications;

		await this.carsRepository.create(carExists);

		return carExists;
	}
}

export { CreateCarSpecificationUseCase };
