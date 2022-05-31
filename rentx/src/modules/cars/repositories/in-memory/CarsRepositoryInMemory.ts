import { ICreateCarDTO, IListCarsDTO } from '@modules/cars/dtos';
import { Car } from '@modules/cars/infra/typeorm/entities';
import { ICarsRepository } from '@modules/cars/repositories';

class CarsRepositoryInMemory implements ICarsRepository {
	private cars: Array<Car> = [];

	async create(data: ICreateCarDTO): Promise<Car> {
		const car = new Car();

		Object.assign(car, data);

		this.cars.push(car);

		return car;
	}

	async findByLicensePlate(license_plate: string): Promise<Car> {
		return this.cars.find((car) => car.license_plate === license_plate);
	}

	async findAvailable(data: IListCarsDTO): Promise<Car[]> {
		if (data.brand || data.category_id || data.name)
			return this.cars.filter(
				(car) =>
					car.available === true &&
					((data.brand && car.brand === data.brand) ||
						(data.category_id && car.category_id === data.category_id) ||
						(data.name && car.name === data.name))
			);

		return this.cars.filter((car) => car.available === true);
	}
}

export { CarsRepositoryInMemory };
