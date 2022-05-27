import { parse as csvParse } from 'csv-parse';
import fs from 'fs';
import { inject, injectable } from 'tsyringe';

import { CategoriesRepository } from '../../repositories';

interface IImportCategory {
	name: string;
	description: string;
}

@injectable()
class ImportCategoryUseCase {
	constructor(
		@inject('CategoriesRepository')
		private categoriesRepository: CategoriesRepository
	) {}

	loadCategories(file: Express.Multer.File): Promise<Array<IImportCategory>> {
		return new Promise((resolve, reject) => {
			const stream = fs.createReadStream(file.path);

			const categories: Array<IImportCategory> = [];

			const parseFile = csvParse();

			stream.pipe(parseFile);

			parseFile
				.on('data', async (line) => {
					const [name, description] = line;

					categories.push({ name, description });
				})
				.on('end', () => {
					fs.promises.unlink(file.path);

					resolve(categories);
				})
				.on('error', (error) => reject(error));
		});
	}

	async execute(file: Express.Multer.File): Promise<void> {
		const categories = await this.loadCategories(file);

		categories.map(async ({ name, description }) => {
			const existCategory = await this.categoriesRepository.findByName(name);

			if (!existCategory)
				await this.categoriesRepository.create({ name, description });
		});
	}
}

export { ImportCategoryUseCase };