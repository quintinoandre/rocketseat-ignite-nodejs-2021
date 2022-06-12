import dayjs from 'dayjs';

import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory';
import { ICreateRentalDTO } from '@modules/rentals/dtos';
import { Rental } from '@modules/rentals/infra/typeorm/entities';
import { RentalsRepositoryInMemory } from '@modules/rentals/repositories/in-memory';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations';
import { AppError } from '@shared/erros';

import { CreateRentalUseCase } from '.';

let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let createRentalUseCase: CreateRentalUseCase;
let dayjsDateProvider: DayjsDateProvider;
let rental: ICreateRentalDTO;
let createdRental: Rental;

describe('Create Rental', () => {
	const dayAdd24Hours = dayjs().add(1, 'day').toDate();

	beforeEach(async () => {
		rentalsRepositoryInMemory = new RentalsRepositoryInMemory();

		carsRepositoryInMemory = new CarsRepositoryInMemory();

		dayjsDateProvider = new DayjsDateProvider();

		createRentalUseCase = new CreateRentalUseCase(
			rentalsRepositoryInMemory,
			dayjsDateProvider,
			carsRepositoryInMemory
		);

		rental = {
			user_id: 'Test User ID',
			car_id: 'Test Car ID',
			expected_return_date: dayAdd24Hours,
		};

		createdRental = await createRentalUseCase.execute(rental);
	});

	it('Should be able to create a new rental', async () => {
		expect(createdRental).toHaveProperty('id');
		expect(createdRental).toHaveProperty('start_date');
	});

	it('Should not be able to create a new rental if there is another open rental for the same user', async () => {
		await expect(
			createRentalUseCase.execute({
				user_id: rental.user_id,
				car_id: 'Test Car ID 2',
				expected_return_date: dayAdd24Hours,
			})
		).rejects.toEqual(
			new AppError('There is already a rental in progress for this user')
		);
	});

	it('Should not be able to create a new rental if there is another open rental for the same car', async () => {
		await expect(
			createRentalUseCase.execute({
				user_id: 'Test User ID 2',
				car_id: rental.car_id,
				expected_return_date: dayAdd24Hours,
			})
		).rejects.toEqual(new AppError('Car is not available'));
	});

	it('Should not be able to create a new rental with invalid return time', async () => {
		await expect(
			createRentalUseCase.execute({
				user_id: 'Test User ID 2',
				car_id: 'Test User ID 2',
				expected_return_date: dayjs().toDate(),
			})
		).rejects.toEqual(
			new AppError('The rental time must be at least 24 hours')
		);
	});
});
