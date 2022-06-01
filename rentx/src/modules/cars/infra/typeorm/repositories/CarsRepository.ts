import { getRepository, Repository } from 'typeorm';

import { ICreateCarDTO, IListCarsDTO } from '@modules/cars/dtos';
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

	async findAvailable(data: IListCarsDTO): Promise<Car[]> {
		const carsQuery = this.repository
			.createQueryBuilder('cars')
			.where('cars.available = :available', { available: true });

		if (data.category_id)
			carsQuery.andWhere('cars.category_id = :category_id', {
				category_id: data.category_id,
			});

		if (data.brand)
			carsQuery.andWhere('cars.brand = :brand', { brand: data.brand });

		if (data.name) carsQuery.andWhere('cars.name = :name', { name: data.name });

		const cars = await carsQuery.getMany();

		return cars;
	}
}

export { CarsRepository };
