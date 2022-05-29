import { ICreateCategoryDTO } from '../../dtos';
import { Category } from '../../entities';
import { ICategoriesRepository } from '../ICategoriesRepository';

class CategoriesRepositoryInMemory implements ICategoriesRepository {
	private categories: Array<Category> = [];

	async create(data: ICreateCategoryDTO): Promise<void> {
		const category = new Category();

		Object.assign(category, { ...data });

		this.categories.push(category);
	}

	async list(): Promise<Category[]> {
		const categoriesList = this.categories;

		return categoriesList;
	}
	async findByName(name: string): Promise<Category> {
		const result = this.categories.find((category) => category.name === name);

		return result;
	}
}

export { CategoriesRepositoryInMemory };
