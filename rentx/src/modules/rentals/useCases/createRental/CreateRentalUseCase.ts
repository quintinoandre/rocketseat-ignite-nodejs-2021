import { ICreateRentalDTO } from '@modules/rentals/dtos';
import { Rental } from '@modules/rentals/infra/typeorm/entities';
import { IRentalsRepository } from '@modules/rentals/repositories';
import { IDateProvider } from '@shared/container/providers/DateProvider';
import { AppError } from '@shared/erros';

class CreateRentalUseCase {
	constructor(
		private rentalsRepository: IRentalsRepository,
		private dateProvider: IDateProvider
	) {}

	async execute(data: ICreateRentalDTO): Promise<Rental> {
		const MINIMUM_RENTAL_TIME = 24;

		const carIsNotAvailable =
			await this.rentalsRepository.findOpenRentalByCarId(data.car_id);

		if (carIsNotAvailable) throw new AppError('Car is not available');

		const rentalOpenToUser =
			await this.rentalsRepository.findOpenRentalByUserId(data.user_id);

		if (rentalOpenToUser)
			throw new AppError('There is already a rental in progress for this user');

		const dateNow = this.dateProvider.dateNow();

		const compare = this.dateProvider.compareInHours(
			dateNow,
			data.expect_return_date
		);

		if (compare < MINIMUM_RENTAL_TIME)
			throw new AppError('The rental time must be at least 24 hours');

		const rental = await this.rentalsRepository.create(data);

		return rental;
	}
}

export { CreateRentalUseCase };
