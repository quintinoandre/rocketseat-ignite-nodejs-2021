import { ICreateCarDTO, ICreateSpecificationDTO } from '@modules/cars/dtos';
import { Car, Specification } from '@modules/cars/infra/typeorm/entities';
import {
	CarsRepositoryInMemory,
	SpecificationsRepositoryInMemory,
} from '@modules/cars/repositories/in-memory';
import { AppError } from '@shared/erros';

import { CreateCarSpecificationUseCase } from '.';

let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;
let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let car: ICreateCarDTO;
let createdCar: Car;
let specification: ICreateSpecificationDTO;
let createdSpecification: Specification;

describe('Create car Specification', () => {
	beforeEach(async () => {
		carsRepositoryInMemory = new CarsRepositoryInMemory();

		specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory();

		createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
			carsRepositoryInMemory,
			specificationsRepositoryInMemory
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

		specification = {
			name: 'Test Specification Name',
			description: 'Test Specification Description',
		};

		createdSpecification = await specificationsRepositoryInMemory.create(
			specification
		);
	});

	it('Should be able to add a new specification to the car', async () => {
		const specifications_id = [createdSpecification.id];

		const specificationsCars = await createCarSpecificationUseCase.execute({
			car_id: createdCar.id,
			specifications_id,
		});

		expect(specificationsCars).toHaveProperty('specifications');
		expect(specificationsCars.specifications).toHaveLength(1);
	});

	it('Should not be able to add a new specification to a non-existent car', async () => {
		const specifications_id = [createdSpecification.id];

		await expect(
			createCarSpecificationUseCase.execute({
				car_id: 'fake_car_id',
				specifications_id,
			})
		).rejects.toEqual(new AppError('Car does not exists', 404));
	});
});
