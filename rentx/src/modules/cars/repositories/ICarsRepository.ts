import { ICreateCarDTO, IListAvailableCarsDTO } from '@modules/cars/dtos';
import { Car } from '@modules/cars/infra/typeorm/entities';

interface ICarsRepository {
	create(data: ICreateCarDTO): Promise<Car>;
	findByLicensePlate(license_plate: string): Promise<Car>;
	findAvailable(data: IListAvailableCarsDTO): Promise<Car[]>;
	findById(id: string): Promise<Car>;
	updateAvailability(id: string, available: boolean): Promise<void>;
}

export { ICarsRepository };
