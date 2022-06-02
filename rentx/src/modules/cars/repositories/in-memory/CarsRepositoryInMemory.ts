import { ICreateCarDTO, IListAvailableCarsDTO } from '@modules/cars/dtos';
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

	async findAvailable(data: IListAvailableCarsDTO): Promise<Car[]> {
		const availableCars = this.cars.filter(({ available }) => !!available);

		if (data.category_id)
			return availableCars.filter(
				({ category_id }) => category_id === data.category_id
			);

		if (data.brand)
			return availableCars.filter(({ brand }) => brand === data.brand);

		if (data.name)
			return availableCars.filter(({ name }) => name === data.name);

		return availableCars;
	}

	async findById(id: string): Promise<Car> {
		return this.cars.find((car) => car.id === id);
	}
}

export { CarsRepositoryInMemory };
