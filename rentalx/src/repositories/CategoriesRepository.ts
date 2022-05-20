import { Category } from '../model';

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

	findByName(name: string): Category | undefined {
		const category = this.categories.find((item) => item.name === name);

		return category;
	}
}

export { CategoriesRepository };
