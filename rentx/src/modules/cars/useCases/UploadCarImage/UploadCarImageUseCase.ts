import { IUploadCarImageDTO } from '@modules/cars/dtos';
import { CarImage } from '@modules/cars/infra/typeorm/entities';
import { ICarsImagesRepository } from '@modules/cars/repositories';

class UploadCarImageUseCase {
	constructor(private carsImagesRepository: ICarsImagesRepository) {}

	async execute(data: IUploadCarImageDTO): Promise<CarImage> {}
}

export { UploadCarImageUseCase };
