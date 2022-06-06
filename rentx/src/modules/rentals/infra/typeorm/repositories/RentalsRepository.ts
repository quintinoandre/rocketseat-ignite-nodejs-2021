import { getRepository, Repository } from 'typeorm';

import { ICreateRentalDTO } from '@modules/rentals/dtos';
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';
import { IRentalsRepository } from '@modules/rentals/repositories';

class RentalsRepository implements IRentalsRepository {
	constructor(private repository: Repository<Rental> = getRepository(Rental)) {}

	async findOpenRentalByCarId(car_id: string): Promise<Rental> {
		const rental = await this.repository.findOne({ car_id });

		/* const rental = await this.repository.query(`
		SELECT * FROM rentals
		WHERE car_id = '${car_id}';
		`); */

		return rental;
	}

	async findOpenRentalByUserId(user_id: string): Promise<Rental> {
		const rental = await this.repository.findOne({ user_id });

		/* const rental = await this.repository.query(`
		SELECT * FROM rentals
		WHERE user_id = '${user_id}';
		`); */

		return rental;
	}

	async create(data: ICreateRentalDTO): Promise<Rental> {
		const rental = this.repository.create(data);

		const result = await this.repository.save(rental);

		return result;

		/* const id = uuidV4();

		const { car_id, user_id, expected_return_date } = data;

		const [rental] = await this.repository.query(`
		INSERT INTO rentals
		(id, car_id, user_id, expected_return_date)
		VALUES
		('${id}','${car_id}','${user_id}','${expected_return_date}')
		RETURNING *;
		`);

		return rental; */
	}
}

export { RentalsRepository };
