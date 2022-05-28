import { inject, injectable } from 'tsyringe';

import { ICreateCategoryDTO } from '../../dtos';
import { ICategoriesRepository } from '../../repositories';

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

		if (categoryAlreadyExists) throw new Error('Category already exists');

		this.categoriesRepository.create({ ...data });
	}
}

export { CreateCategoryUseCase };
