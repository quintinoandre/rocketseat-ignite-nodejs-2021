import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ImportCategoryUseCase } from '.';

class ImportCategoryController {
	async handle(request: Request, response: Response): Promise<Response> {
		const { file } = request;

		const importCategoryUseCase = container.resolve(ImportCategoryUseCase);

		await importCategoryUseCase.execute(file);

		return response.sendStatus(204); //* status 204 - No content
	}
}

export { ImportCategoryController };
