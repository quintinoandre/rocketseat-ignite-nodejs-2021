import { IListCarsDTO } from '@modules/cars/dtos';
import { Car } from '@modules/cars/infra/typeorm/entities';
import { ICarsRepository } from '@modules/cars/repositories';

class ListCarsUseCase {
	constructor(private carsRepository: ICarsRepository) {}

	async execute(data: IListCarsDTO): Promise<Car[]> {
		const cars = await this.carsRepository.findAvailable(data);

		return cars;
	}
}

export { ListCarsUseCase };
