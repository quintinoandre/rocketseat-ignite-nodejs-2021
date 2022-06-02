import { ICreateCarSpecificationDTO } from '@modules/cars/dtos';
import {
	ICarsRepository,
	ISpecificationsRepository,
} from '@modules/cars/repositories';
import { AppError } from '@shared/erros';

class CreateCarSpecificationUseCase {
	constructor(
		private carsRepository: ICarsRepository,
		private specificationsRepository: ISpecificationsRepository
	) {}

	async execute(data: ICreateCarSpecificationDTO): Promise<void> {
		const carExists = await this.carsRepository.findById(data.car_id);

		if (!carExists) throw new AppError('Car does not exists', 404); //! Not Found

		const specifications = await this.specificationsRepository.findByIds(
			data.specifications_id
		);

		carExists.specifications = specifications;

		await this.carsRepository.create(carExists);

		console.log(carExists);
	}
}

export { CreateCarSpecificationUseCase };
