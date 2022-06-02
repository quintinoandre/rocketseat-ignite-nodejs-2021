import {
	CarsRepositoryInMemory,
	SpecificationsRepositoryInMemory,
} from '@modules/cars/repositories/in-memory';
import { AppError } from '@shared/erros';

import { CreateCarSpecificationUseCase } from '.';

let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;
let createCarSpecificationUseCase: CreateCarSpecificationUseCase;

describe('Create car Specification', () => {
	beforeEach(() => {
		carsRepositoryInMemory = new CarsRepositoryInMemory();

		specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory();

		createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
			carsRepositoryInMemory,
			specificationsRepositoryInMemory
		);
	});

	it('should be able to add a new specification to the car', async () => {
		const car = await carsRepositoryInMemory.create({
			name: 'Name Car',
			description: 'Description Car',
			daily_rate: 100,
			license_plate: 'ABC-1234',
			fine_amount: 60,
			brand: 'Brand',
			category_id: 'category',
		});

		const specification = await specificationsRepositoryInMemory.create({
			name: 'test',
			description: 'test',
		});

		const specifications_id = [specification.id];

		const specificationsCars = await createCarSpecificationUseCase.execute({
			car_id: car.id,
			specifications_id,
		});

		expect(specificationsCars).toHaveProperty('specifications');
		expect(specificationsCars.specifications).toHaveLength(1);
	});

	it('should not be able to add a new specification to a non-existent car', () => {
		expect(async () => {
			const car_id = '1234';

			const specifications_id = ['54321'];

			await createCarSpecificationUseCase.execute({
				car_id,
				specifications_id,
			});
		}).rejects.toBeInstanceOf(AppError);
	});
});
