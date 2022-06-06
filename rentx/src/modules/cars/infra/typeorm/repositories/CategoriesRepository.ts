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

		/* const id = uuidV4();

		const { name, description } = data;

		await this.repository.query(`
		INSERT INTO categories
		(id, name, description)
		VALUES
		('${id}', '${name}', '${description}');
		`); */
	}

	async list(): Promise<Category[]> {
		const categories = await this.repository.find();

		return categories;

		/* const categories = await this.repository.query(`
		SELECT * FROM categories;
		`);

		return categories; */
	}

	async findByName(name: string): Promise<Category> {
		const category = await this.repository.findOne({ name });

		return category;

		/* const category = await this.repository.query(`
		SELECT * FROM categories
		WHERE name = '${name}';
		`);

		return category; */
	}
}

export { CategoriesRepository };
