import { inject, injectable } from 'tsyringe';

import { ICreateCategoryDTO } from '../../dtos';
import { ICategoriesRepository } from '../../repositories';

@injectable()
class CreateCategoryUseCase {
	constructor(
		@inject('CategoriesRepository')
		private categoriesRepository: ICategoriesRepository
	) {}

	async execute({ name, description }: ICreateCategoryDTO): Promise<void> {
		const categoryAlreadyExists = await this.categoriesRepository.findByName(
			name
		);

		if (categoryAlreadyExists) throw new Error('Category already exists');

		this.categoriesRepository.create({ name, description });
	}
}

export { CreateCategoryUseCase };
