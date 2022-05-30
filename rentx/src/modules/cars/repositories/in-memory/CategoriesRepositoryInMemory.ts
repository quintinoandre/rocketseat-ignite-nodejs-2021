import { ICreateCategoryDTO } from '@modules/cars/dtos';
import { Category } from '@modules/cars/infra';

import { ICategoriesRepository } from '../ICategoriesRepository';

class CategoriesRepositoryInMemory implements ICategoriesRepository {
	private categories: Array<Category> = [];

	async create(data: ICreateCategoryDTO): Promise<void> {
		const category = new Category();

		Object.assign(category, { ...data });

		this.categories.push(category);
	}

	async list(): Promise<Category[]> {
		return this.categories;
	}

	async findByName(name: string): Promise<Category> {
		return this.categories.find((category) => category.name === name);
	}
}

export { CategoriesRepositoryInMemory };
