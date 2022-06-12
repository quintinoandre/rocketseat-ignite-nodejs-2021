import { ICreateCategoryDTO } from '@modules/cars/dtos';
import { CategoriesRepositoryInMemory } from '@modules/cars/repositories/in-memory';
import { AppError } from '@shared/erros';

import { CreateCategoryUseCase } from '.';

let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;
let createCategoryUseCase: CreateCategoryUseCase;
let category: ICreateCategoryDTO;

describe('Create category', () => {
	beforeEach(async () => {
		categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();

		createCategoryUseCase = new CreateCategoryUseCase(
			categoriesRepositoryInMemory
		);

		category = {
			name: 'Test Category Name',
			description: 'Test Category Description',
		};

		await createCategoryUseCase.execute(category);
	});

	it('Should be able to create a new category', async () => {
		const result = await categoriesRepositoryInMemory.findByName(category.name);

		expect(result).toHaveProperty('id');
	});

	it('Should not be able to create a new category with the same name', async () => {
		await expect(createCategoryUseCase.execute(category)).rejects.toEqual(
			new AppError('Category already exists')
		);
	});
});
