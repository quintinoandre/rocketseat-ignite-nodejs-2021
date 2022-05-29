import { AppError } from '@erros';
import { ICreateCategoryDTO } from '@modules/cars/dtos';
import { CategoriesRepositoryInMemory } from '@modules/cars/repositories';

import { CreateCategoryUseCase } from './CreateCategoryUseCase';

let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;
let createCategoryUseCase: CreateCategoryUseCase;

describe('Create category', () => {
	beforeEach(() => {
		categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();

		createCategoryUseCase = new CreateCategoryUseCase(
			categoriesRepositoryInMemory
		);
	});

	it('should be able to create a new category', async () => {
		const category: ICreateCategoryDTO = {
			name: 'Category Test',
			description: 'Category Description Test',
		};

		await createCategoryUseCase.execute(category);

		const categoryCreated = await categoriesRepositoryInMemory.findByName(
			category.name
		);

		expect(categoryCreated).toHaveProperty('id');
	});

	it('should not be able to create a new category with the same name', async () => {
		expect(async () => {
			const category: ICreateCategoryDTO = {
				name: 'Category Test',
				description: 'Category Description Test',
			};

			await createCategoryUseCase.execute(category);

			await createCategoryUseCase.execute(category);
		}).rejects.toBeInstanceOf(AppError);
	});
});
