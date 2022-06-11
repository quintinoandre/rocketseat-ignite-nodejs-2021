import { inject, injectable } from 'tsyringe';

import { ICreateCategoryDTO } from '@modules/cars/dtos';
import { ICategoriesRepository } from '@modules/cars/repositories';
import { AppError } from '@shared/erros';

@injectable()
class CreateCategoryUseCase {
	constructor(
		@inject('CategoriesRepository')
		private categoriesRepository: ICategoriesRepository
	) {}

	async execute(data: ICreateCategoryDTO): Promise<void> {
		const categoryAlreadyExists = await this.categoriesRepository.findByName(
			data.name
		);

		if (categoryAlreadyExists) throw new AppError('Category already exists'); //! status 400 - Bad request

		this.categoriesRepository.create(data);
	}
}

export { CreateCategoryUseCase };
