import { Category } from '../model';

// DTO (Data Transfer Object)
interface ICreateCategoryDTO {
	name: string;
	description: string;
}

interface ICategoriesRepository {
	findByName(name: string): Category | undefined;
	list(): Array<Category>;
	create({ name, description }: ICreateCategoryDTO): void;
}

export type { ICreateCategoryDTO, ICategoriesRepository };
