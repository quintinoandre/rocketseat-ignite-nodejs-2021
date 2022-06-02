import { IUploadCarImagesDTO } from '@modules/cars/dtos';
import { CarImage } from '@modules/cars/infra/typeorm/entities';

interface ICarsImagesRepository {
	create(data: IUploadCarImagesDTO): Promise<CarImage>;
}

export { ICarsImagesRepository };
