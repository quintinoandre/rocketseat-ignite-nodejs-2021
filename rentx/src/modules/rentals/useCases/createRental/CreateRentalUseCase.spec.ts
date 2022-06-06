import dayjs from 'dayjs';

import { RentalsRepositoryInMemory } from '@modules/rentals/repositories/in-memory';
import { AppError } from '@shared/erros';

import { CreateRentalUseCase } from '.';

let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let createRentalUseCase: CreateRentalUseCase;

describe('Create Rental', () => {
	const dayAdd24Hours = dayjs().add(1, 'day').toDate();

	beforeEach(() => {
		rentalsRepositoryInMemory = new RentalsRepositoryInMemory();

		createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory);
	});

	it('Should be able to create a new rental', async () => {
		const rental = await createRentalUseCase.execute({
			user_id: '12345',
			car_id: '121212',
			expect_return_date: dayAdd24Hours,
		});

		expect(rental).toHaveProperty('id');
		expect(rental).toHaveProperty('start_date');
	});

	it('Should not be able to create a new rental if there is another open rental for the same user', () => {
		expect(async () => {
			await createRentalUseCase.execute({
				user_id: '12345',
				car_id: '121212',
				expect_return_date: dayAdd24Hours,
			});

			await createRentalUseCase.execute({
				user_id: '12345',
				car_id: '121212',
				expect_return_date: dayAdd24Hours,
			});
		}).rejects.toBeInstanceOf(AppError);
	});

	it('Should not be able to create a new rental if there is another open rental for the same car', () => {
		expect(async () => {
			await createRentalUseCase.execute({
				user_id: '123',
				car_id: 'test',
				expect_return_date: dayAdd24Hours,
			});

			await createRentalUseCase.execute({
				user_id: '321',
				car_id: 'test',
				expect_return_date: dayAdd24Hours,
			});
		}).rejects.toBeInstanceOf(AppError);
	});

	it('Should not be able to create a new rental with invalid return time', () => {
		expect(async () => {
			await createRentalUseCase.execute({
				user_id: '123',
				car_id: 'test',
				expect_return_date: dayjs().toDate(),
			});
		}).rejects.toBeInstanceOf(AppError);
	});
});
