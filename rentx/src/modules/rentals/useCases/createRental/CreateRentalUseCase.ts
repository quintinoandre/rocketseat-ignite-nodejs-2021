import { ICreateRentalDTO } from '@modules/rentals/dtos';
import { IRentalsRepository } from '@modules/rentals/repositories';
import { AppError } from '@shared/erros';

class CreateRentalUseCase {
	constructor(private rentalsRepository: IRentalsRepository) {}

	async execute(data: ICreateRentalDTO): Promise<void> {
		const carIsNotAvailable =
			await this.rentalsRepository.findOpenRentalByCarId(data.car_id);

		if (carIsNotAvailable) throw new AppError('Car is not available');

		const rentalOpenToUser =
			await this.rentalsRepository.findOpenRentalByUserId(data.user_id);

		if (rentalOpenToUser)
			throw new AppError('There is already a rental in progress for this user');
	}
}

export { CreateRentalUseCase };
