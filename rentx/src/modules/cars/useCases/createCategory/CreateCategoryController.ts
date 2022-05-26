import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateCategoryUseCase } from './CreateCategoryUseCase';

class CreateCategoryController {
	async handle(request: Request, response: Response): Promise<Response> {
		const {
			body: { name, description },
		} = request;

		const createCategoryUseCase = container.resolve(CreateCategoryUseCase);

		await createCategoryUseCase.execute({ name, description });

		return response.sendStatus(201); //* Created
	}
}

export { CreateCategoryController };
