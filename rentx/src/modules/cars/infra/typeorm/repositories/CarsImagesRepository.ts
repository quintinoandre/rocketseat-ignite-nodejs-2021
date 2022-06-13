import { getRepository, Repository } from 'typeorm';

import { IUploadCarImagesDTO } from '@modules/cars/dtos';
import { CarImage } from '@modules/cars/infra/typeorm/entities';
import { ICarsImagesRepository } from '@modules/cars/repositories';

class CarsImagesRepository implements ICarsImagesRepository {
	constructor(
		private repository: Repository<CarImage> = getRepository(CarImage)
	) {}

	async create(data: IUploadCarImagesDTO): Promise<CarImage> {
		const carImage = this.repository.create(data);

		await this.repository.save(carImage);

		/* const id = uuidV4();

		const { car_id, image_name } = data;

		const [carImage] = await this.repository.query(`
			INSERT INTO car_images
			(id, car_id, image_name)
			VALUES
			('${id}', '${car_id}', '${image_name}')
			RETURNING *;
		`); */

		return carImage;
	}
}

export { CarsImagesRepository };
