import { injectable, inject } from 'tsyringe';

import { ICarsRepository } from '@modules/cars/repositories';
import { ICreateRentalDTO } from '@modules/rentals/dtos';
import { Rental } from '@modules/rentals/infra/typeorm/entities';
import { IRentalsRepository } from '@modules/rentals/repositories';
import { IDateProvider } from '@shared/container/providers/DateProvider';
import { AppError } from '@shared/erros';

@injectable()
class CreateRentalUseCase {
	constructor(
		@inject('RentalsRepository')
		private rentalsRepository: IRentalsRepository,
		@inject('DayjsDateProvider')
		private dateProvider: IDateProvider,
		@inject('CarsRepository')
		private carRepository: ICarsRepository
	) {}

	async execute(data: ICreateRentalDTO): Promise<Rental> {
		const MINIMUM_RENTAL_TIME = 24;

		const carIsNotAvailable =
			await this.rentalsRepository.findOpenRentalByCarId(data.car_id);

		if (carIsNotAvailable) throw new AppError('Car is not available'); //! status 400 - bad request

		const rentalOpenToUser =
			await this.rentalsRepository.findOpenRentalByUserId(data.user_id);

		if (rentalOpenToUser)
			throw new AppError('There is already a rental in progress for this user'); //! status 400 - bad request

		const dateNow = this.dateProvider.dateNow();

		const compare = this.dateProvider.compareInHours(
			dateNow,
			data.expected_return_date
		);

		if (compare < MINIMUM_RENTAL_TIME)
			throw new AppError('The rental time must be at least 24 hours'); //! status 400 - bad request

		const rental = await this.rentalsRepository.create(data);

		await this.carRepository.updateAvailability(data.car_id, false);

		return rental;
	}
}

export { CreateRentalUseCase };
