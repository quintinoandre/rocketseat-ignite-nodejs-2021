import { inject, injectable } from 'tsyringe';

import { AppError } from '@erros';
import { ICreateCategoryDTO } from '@modules/cars/dtos';
import { ICategoriesRepository } from '@modules/cars/repositories';

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

		if (categoryAlreadyExists) throw new AppError('Category already exists'); //! Bad Request

		this.categoriesRepository.create({ ...data });
	}
}

export { CreateCategoryUseCase };
