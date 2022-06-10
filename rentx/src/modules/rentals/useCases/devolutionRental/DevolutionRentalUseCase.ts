import { inject, injectable } from 'tsyringe';

import { ICarsRepository } from '@modules/cars/repositories';
import { IDevolutionRentalDTO } from '@modules/rentals/dtos';
import { Rental } from '@modules/rentals/infra/typeorm/entities';
import { IRentalsRepository } from '@modules/rentals/repositories';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations';
import { AppError } from '@shared/erros';

@injectable()
class DevolutionRentalUseCase {
	constructor(
		@inject('RentalsRepository')
		private rentalsRepository: IRentalsRepository,
		@inject('CarsRepository')
		private carsRepository: ICarsRepository,
		@inject('DayjsDateProvider')
		private dateProvider: DayjsDateProvider
	) {}

	async execute(data: IDevolutionRentalDTO): Promise<Rental> {
		const MINIMUM_DAILY = 1;

		const rental = await this.rentalsRepository.findById(data.id);

		const car = await this.carsRepository.findById(rental.car_id);

		if (!rental) throw new AppError('Rental does not exists', 404); //! status 404 - not found

		const dateNow = this.dateProvider.dateNow();

		let daily = this.dateProvider.compareInDays(rental.start_date, dateNow);

		if (daily <= 0) daily = MINIMUM_DAILY;

		const delay = this.dateProvider.compareInDays(
			dateNow,
			rental.expected_return_date
		);

		let total = 0;

		if (delay > 0) {
			const calculateFine = delay * car.fine_amount;

			total = calculateFine;
		}

		total += daily * car.daily_rate;

		rental.end_date = dateNow;

		rental.total = total;

		await this.rentalsRepository.create(rental);

		await this.carsRepository.updateAvailability(car.id, true);

		return rental;
	}
}

export { DevolutionRentalUseCase };
