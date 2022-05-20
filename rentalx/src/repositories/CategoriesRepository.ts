import { Category } from '../model/category';

// DTO (Data Transfer Object)
interface ICreateCategoryDTO {
	name: string;
	description: string;
}

class CategoriesRepository {
	constructor(private categories: Array<Category>) {}

	create({ name, description }: ICreateCategoryDTO): void {
		const category = new Category();

		Object.assign(category, {
			name,
			description,
			created_at: new Date(),
		});

		this.categories.push(category);
	}

	list(): Array<Category> {
		return this.categories;
	}
}

export { CategoriesRepository };
