import { Rental } from '@modules/rentals/infra/typeorm/entities';

interface IRentalsRepository {
	findOpenRentalByCarId(car_id: string): Promise<Rental>;
	findOpenRentalByUserId(user_id: string): Promise<Rental>;
}

export { IRentalsRepository };
