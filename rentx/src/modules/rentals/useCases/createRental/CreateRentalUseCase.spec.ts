import { RentalsRepositoryInMemory } from '@modules/rentals/repositories/in-memory';

import { CreateRentalUseCase } from '.';

let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let createRentalUseCase: CreateRentalUseCase;

describe('Create Rental', () => {
	beforeEach(() => {
		rentalsRepositoryInMemory = new RentalsRepositoryInMemory();

		createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory);
	});

	it('Should be able to create a new rental', async () => {
		await createRentalUseCase.execute({
			user_id: '12345',
			car_id: '121212',
			expect_return_date: new Date(),
		});
	});
});
