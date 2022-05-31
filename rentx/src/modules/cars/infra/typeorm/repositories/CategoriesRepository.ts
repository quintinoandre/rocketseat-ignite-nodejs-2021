import { getRepository, Repository } from 'typeorm';

import { ICreateCategoryDTO } from '@modules/cars/dtos';
import { Category } from '@modules/cars/infra/typeorm/entities';
import { ICategoriesRepository } from '@modules/cars/repositories';

class CategoriesRepository implements ICategoriesRepository {
	constructor(
		private repository: Repository<Category> = getRepository(Category)
	) {}

	async create(data: ICreateCategoryDTO): Promise<void> {
		const category = this.repository.create(data);

		await this.repository.save(category);
	}

	async list(): Promise<Category[]> {
		const categories = await this.repository.find();

		return categories;
	}

	async findByName(name: string): Promise<Category> {
		const category = await this.repository.findOne({ name });

		return category;
	}
}

export { CategoriesRepository };
