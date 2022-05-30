import { ICreateCarDTO } from '@modules/cars/dtos';

import { Car } from '../infra/typeorm/entities';

interface ICarsRepository {
	create(data: ICreateCarDTO): Promise<Car>;
	findByLicensePlate(license_plate: string): Promise<Car>;
}

export { ICarsRepository };
