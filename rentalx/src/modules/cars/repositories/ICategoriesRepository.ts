import { Category } from '../model';

// DTO (Data Transfer Object)
interface ICreateCategoryDTO {
	name: string;
	description: string;
}

interface ICategoriesRepository {
	create({ name, description }: ICreateCategoryDTO): void;
	list(): Array<Category>;
	findByName(name: string): Category;
}

export type { ICreateCategoryDTO, ICategoriesRepository };
