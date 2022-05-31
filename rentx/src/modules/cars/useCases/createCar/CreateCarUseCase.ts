import { inject, injectable } from 'tsyringe';

import { ICreateCarDTO } from '@modules/cars/dtos';
import { Car } from '@modules/cars/infra/typeorm/entities';
import { ICarsRepository } from '@modules/cars/repositories';
import { AppError } from '@shared/erros';

@injectable()
class CreateCarUseCase {
	constructor(
		@inject('CarsRepository')
		private carsRepository: ICarsRepository
	) {}

	async execute(data: ICreateCarDTO): Promise<Car> {
		const carAlreadyExists = await this.carsRepository.findByLicensePlate(
			data.license_plate
		);

		if (carAlreadyExists) throw new AppError('Car already exists'); //! Bad Request

		const car = await this.carsRepository.create(data);

		return car;
	}
}

export { CreateCarUseCase };
