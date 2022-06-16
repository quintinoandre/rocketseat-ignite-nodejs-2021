import { inject, injectable } from 'tsyringe';

import { ICarsImagesRepository } from '@modules/cars/repositories';
import { IStorageProvider } from '@shared/container/providers/StorageProvider';

interface IRequest {
	car_id: string;
	images_name: Array<string>;
}

@injectable()
class UploadCarImagesUseCase {
	constructor(
		@inject('CarsImagesRepository')
		private carsImagesRepository: ICarsImagesRepository,
		@inject('StorageProvider')
		private storageProvider: IStorageProvider
	) {}

	async execute({ car_id, images_name }: IRequest): Promise<void> {
		images_name.map(async (image) => {
			await this.carsImagesRepository.create({
				car_id,
				image_name: image,
			});

			await this.storageProvider.save(image, 'cars');
		});
	}
}

export { UploadCarImagesUseCase };
