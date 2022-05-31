import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory';

import { ListCarsUseCase } from '.';

let carsRepositoryInMemory: CarsRepositoryInMemory;
let listCarsUseCase: ListCarsUseCase;

describe('List cars', () => {
	beforeEach(() => {
		carsRepositoryInMemory = new CarsRepositoryInMemory();

		listCarsUseCase = new ListCarsUseCase(carsRepositoryInMemory);
	});

	it('should be able to list all available cars', async () => {
		const car = await carsRepositoryInMemory.create({
			name: 'Car1',
			description: 'Car description',
			daily_rate: 110,
			license_plate: 'DEF-1234',
			fine_amount: 100,
			brand: 'Car_brand',
			category_id: 'category_id',
		});

		const cars = await listCarsUseCase.execute({});

		// console.log(cars);

		expect(cars).toEqual([car]);
	});

	it('should be able to list all available cars by name', async () => {
		const car = await carsRepositoryInMemory.create({
			name: 'Car2',
			description: 'Car description',
			daily_rate: 110,
			license_plate: 'DEF-1234',
			fine_amount: 100,
			brand: 'Car_brand_test',
			category_id: 'category_id',
		});

		const cars = await listCarsUseCase.execute({ brand: 'Car_brand_test' });

		expect(cars).toEqual([car]);
	});
});
