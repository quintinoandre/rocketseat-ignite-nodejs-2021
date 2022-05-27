import { ICreateCategoryDTO } from '../dtos';
import { Category } from '../entities';

interface ICategoriesRepository {
	create({ name, description }: ICreateCategoryDTO): Promise<void>;
	list(): Promise<Category[]>;
	findByName(name: string): Promise<Category>;
}

export type { ICategoriesRepository };
