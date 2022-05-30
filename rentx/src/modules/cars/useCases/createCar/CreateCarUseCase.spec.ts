import { ICreateCarDTO } from '@modules/cars/dtos';
import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory';

import { CreateCarUseCase } from '.';

let carsRepositoryInMemory: CarsRepositoryInMemory;
let createCarUseCase: CreateCarUseCase;

describe('Create Car', () => {
	beforeEach(() => {
		carsRepositoryInMemory = new CarsRepositoryInMemory();

		createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
	});

	it('Sould be able to create a new car', async () => {
		const car: ICreateCarDTO = {
			name: 'Name Car',
			description: 'Description Car',
			daily_rate: 100,
			license_plate: 'ABC-1234',
			fine_amount: 60,
			brand: 'Brand',
			category_id: 'category',
		};

		await createCarUseCase.execute(car);
	});
});
