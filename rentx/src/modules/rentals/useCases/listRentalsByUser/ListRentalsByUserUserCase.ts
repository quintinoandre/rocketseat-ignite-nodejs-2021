import { inject, injectable } from 'tsyringe';

import { IListRentalsByUserDTO } from '@modules/rentals/dtos';
import { Rental } from '@modules/rentals/infra/typeorm/entities';
import { IRentalsRepository } from '@modules/rentals/repositories';

@injectable()
class ListRentalsByUserUserCase {
	constructor(
		@inject('RentalsRepository')
		private rentalsRepository: IRentalsRepository
	) {}

	async execute(data: IListRentalsByUserDTO): Promise<Rental[]> {
		const rentalsByUser = await this.rentalsRepository.findByUser(data.user_id);

		return rentalsByUser;
	}
}

export { ListRentalsByUserUserCase };
