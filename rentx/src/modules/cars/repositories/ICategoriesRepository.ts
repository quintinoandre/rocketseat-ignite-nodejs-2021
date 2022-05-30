import { ICreateCategoryDTO } from '@modules/cars/dtos';
import { Category } from '@modules/cars/infra/typeorm/entities';

interface ICategoriesRepository {
	create(data: ICreateCategoryDTO): Promise<void>;
	list(): Promise<Category[]>;
	findByName(name: string): Promise<Category>;
}

export type { ICategoriesRepository };
