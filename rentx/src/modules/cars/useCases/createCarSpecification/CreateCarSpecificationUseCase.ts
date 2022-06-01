import { ICreateCarSpecificationDTO } from '@modules/cars/dtos';
import { ICarsRepository } from '@modules/cars/repositories';
import { AppError } from '@shared/erros';

class CreateCarSpecificationUseCase {
	constructor(private carsRepository: ICarsRepository) {}

	async execute(data: ICreateCarSpecificationDTO): Promise<void> {
		const carExists = await this.carsRepository.findById(data.car_id);

		if (!carExists) throw new AppError('Car does not exists', 404); //! Not Found
	}
}

export { CreateCarSpecificationUseCase };
