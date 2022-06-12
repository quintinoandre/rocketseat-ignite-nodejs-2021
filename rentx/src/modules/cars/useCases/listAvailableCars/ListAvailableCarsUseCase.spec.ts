import { ICreateCarDTO } from '@modules/cars/dtos';
import { Car } from '@modules/cars/infra/typeorm/entities';
import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory';

import { ListAvailableCarsUseCase } from '.';

let carsRepositoryInMemory: CarsRepositoryInMemory;
let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let car: ICreateCarDTO;
let createdCar: Car;

describe('List cars', () => {
	beforeEach(async () => {
		carsRepositoryInMemory = new CarsRepositoryInMemory();

		listAvailableCarsUseCase = new ListAvailableCarsUseCase(
			carsRepositoryInMemory
		);

		car = {
			name: 'Test Car Name',
			description: 'Test Car Description',
			daily_rate: 100,
			license_plate: 'Test Car License Plate',
			fine_amount: 50,
			brand: 'Test Car Brand',
			category_id: 'Test Car Category ID',
		};

		createdCar = await carsRepositoryInMemory.create(car);
	});

	it('Should be able to list all available cars', async () => {
		const cars = await listAvailableCarsUseCase.execute({});

		expect(cars).toEqual([createdCar]);
	});

	it('Should be able to list all available cars by category', async () => {
		const cars = await listAvailableCarsUseCase.execute({
			category_id: car.category_id,
		});

		expect(cars).toEqual([createdCar]);
	});

	it('Should be able to list all available cars by brand', async () => {
		const cars = await listAvailableCarsUseCase.execute({
			brand: car.brand,
		});

		expect(cars).toEqual([createdCar]);
	});

	it('Should be able to list all available cars by name', async () => {
		const cars = await listAvailableCarsUseCase.execute({ name: car.name });

		expect(cars).toEqual([createdCar]);
	});
});
