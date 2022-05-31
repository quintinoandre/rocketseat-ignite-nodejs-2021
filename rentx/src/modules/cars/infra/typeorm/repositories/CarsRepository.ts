import { getRepository, Repository } from 'typeorm';

import { ICreateCarDTO } from '@modules/cars/dtos';
import { Car } from '@modules/cars/infra/typeorm/entities';
import { ICarsRepository } from '@modules/cars/repositories';

class CarsRepository implements ICarsRepository {
	constructor(private repository: Repository<Car> = getRepository(Car)) {}

	async create(data: ICreateCarDTO): Promise<Car> {
		const car = this.repository.create(data);

		const result = await this.repository.save(car);

		return result;
	}

	async findByLicensePlate(license_plate: string): Promise<Car> {
		const car = await this.repository.findOne({ license_plate });

		return car;
	}
}

export { CarsRepository };
