import { inject, injectable } from 'tsyringe';

import { IListAvailableCarsDTO } from '@modules/cars/dtos';
import { Car } from '@modules/cars/infra/typeorm/entities';
import { ICarsRepository } from '@modules/cars/repositories';

@injectable()
class ListAvailableCarsUseCase {
	constructor(
		@inject('CarsRepository')
		private carsRepository: ICarsRepository
	) {}

	async execute(data: IListAvailableCarsDTO): Promise<Car[]> {
		const cars = await this.carsRepository.findAvailable(data);

		return cars;
	}
}

export { ListAvailableCarsUseCase };
