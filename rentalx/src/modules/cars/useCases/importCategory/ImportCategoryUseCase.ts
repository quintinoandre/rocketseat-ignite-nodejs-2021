import { parse as csvParse } from 'csv-parse';
import fs from 'fs';

import { CategoriesRepository } from '../../repositories';

interface IImportCategory {
	name: string;
	description: string;
}

class ImportCategoryUseCase {
	constructor(private categoriesRepository: CategoriesRepository) {}

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
				.on('end', () => resolve(categories))
				.on('error', (error) => reject(error));
		});
	}

	async execute(file: Express.Multer.File): Promise<void> {
		const categories = await this.loadCategories(file);

		categories.map(async ({ name, description }) => {
			const existCategory = this.categoriesRepository.findByName(name);

			if (!existCategory)
				this.categoriesRepository.create({ name, description });
		});
	}
}

export { ImportCategoryUseCase };
