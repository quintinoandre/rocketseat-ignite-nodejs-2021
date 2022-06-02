import { IUploadCarImageDTO } from '@modules/cars/dtos';
import { CarImage } from '@modules/cars/infra/typeorm/entities';

interface ICarsImagesRepository {
	create(data: IUploadCarImageDTO): Promise<CarImage>;
}

export { ICarsImagesRepository };
