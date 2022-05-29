import { inject, injectable } from 'tsyringe';

import { Category } from '@modules/cars/entities';
import { ICategoriesRepository } from '@modules/cars/repositories';

@injectable()
class ListCategoriesUseCase {
	constructor(
		@inject('CategoriesRepository')
		private categoriesRepository: ICategoriesRepository
	) {}

	async execute(): Promise<Category[]> {
		const categories = await this.categoriesRepository.list();

		return categories;
	}
}

export { ListCategoriesUseCase };
