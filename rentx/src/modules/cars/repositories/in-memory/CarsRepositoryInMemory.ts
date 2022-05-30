import { ICreateCarDTO } from '@modules/cars/dtos';
import { Car } from '@modules/cars/infra/typeorm/entities';
import { ICarsRepository } from '@modules/cars/repositories';

class CarsRepositoryInMemory implements ICarsRepository {
	private cars: Array<ICreateCarDTO> = [];

	async create(data: ICreateCarDTO): Promise<void> {
		const car = new Car();

		Object.assign(car, { ...data });

		this.cars.push(car);
	}
}

export { CarsRepositoryInMemory };
