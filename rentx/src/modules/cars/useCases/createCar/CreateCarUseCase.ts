import { inject, injectable } from 'tsyringe';

import { ICreateCarDTO } from '@modules/cars/dtos';
import { ICarsRepository } from '@modules/cars/repositories';

@injectable()
class CreateCarUseCase {
	constructor(
		@inject('CarsRepository')
		private carsRepository: ICarsRepository
	) {}

	async execute(data: ICreateCarDTO): Promise<void> {
		await this.carsRepository.create(data);
	}
}

export { CreateCarUseCase };
