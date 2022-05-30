import { ICreateCarDTO } from '@modules/cars/dtos';

interface ICarsRepository {
	create(data: ICreateCarDTO): Promise<void>;
}

export { ICarsRepository };
