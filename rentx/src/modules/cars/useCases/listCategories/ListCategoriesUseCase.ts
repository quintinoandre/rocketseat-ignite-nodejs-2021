import { Category } from '../../entities';
import { ICategoriesRepository } from '../../repositories';

class ListCategoriesUseCase {
	constructor(private categoriesRepository: ICategoriesRepository) {}

	execute(): Array<Category> {
		const categories = this.categoriesRepository.list();

		return categories;
	}
}

export { ListCategoriesUseCase };
