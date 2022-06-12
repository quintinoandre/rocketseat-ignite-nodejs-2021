import { ICreateCarDTO } from '@modules/cars/dtos';
import { Car } from '@modules/cars/infra/typeorm/entities';
import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory';
import { AppError } from '@shared/erros';

import { CreateCarUseCase } from '.';

let carsRepositoryInMemory: CarsRepositoryInMemory;
let createCarUseCase: CreateCarUseCase;
let car: ICreateCarDTO;
let createdCar: Car;

describe('Create Car', () => {
	beforeEach(async () => {
		carsRepositoryInMemory = new CarsRepositoryInMemory();

		createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);

		car = {
			name: 'Test Car Name',
			description: 'Test Car Description',
			daily_rate: 100,
			license_plate: 'Test Car License Plate',
			fine_amount: 50,
			brand: 'Test Car Brand',
			category_id: 'Test Car Category ID',
		};

		createdCar = await createCarUseCase.execute(car);
	});

	it('Should be able to create a new car', async () => {
		expect(createdCar).toHaveProperty('id');
	});

	it('Should not be able to create a new car with an existent license plate', async () => {
		await expect(createCarUseCase.execute(car)).rejects.toEqual(
			new AppError('Car already exists')
		);
	});

	it('Should be able to create a new car with availability by default', async () => {
		expect(createdCar.available).toBe(true);
	});
});
