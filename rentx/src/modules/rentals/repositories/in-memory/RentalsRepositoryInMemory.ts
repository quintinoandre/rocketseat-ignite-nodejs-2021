import { ICreateRentalDTO } from '@modules/rentals/dtos';
import { Rental } from '@modules/rentals/infra/typeorm/entities';
import { IRentalsRepository } from '@modules/rentals/repositories';

class RentalsRepositoryInMemory implements IRentalsRepository {
	private rentals: Array<Rental> = [];

	async findOpenRentalByCarId(car_id: string): Promise<Rental> {
		return this.rentals.find(
			(rental) => rental.car_id === car_id && !rental.end_date
		);
	}

	async findOpenRentalByUserId(user_id: string): Promise<Rental> {
		return this.rentals.find(
			(rental) => rental.user_id === user_id && !rental.end_date
		);
	}

	async create(data: ICreateRentalDTO): Promise<Rental> {
		const rental = new Rental();

		Object.assign(rental, { ...data, start_date: new Date() });

		this.rentals.push(rental);

		return rental;
	}

	async findById(id: string): Promise<Rental> {
		return this.rentals.find((rental) => rental.id === id);
	}

	async findByUser(user_id: string): Promise<Rental[]> {
		return this.rentals.filter((rental) => rental.user_id === user_id);
	}
}

export { RentalsRepositoryInMemory };
