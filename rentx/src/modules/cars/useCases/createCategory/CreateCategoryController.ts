import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateCategoryUseCase } from '.';

class CreateCategoryController {
	async handle(request: Request, response: Response): Promise<Response> {
		const { body: data } = request;

		const createCategoryUseCase = container.resolve(CreateCategoryUseCase);

		await createCategoryUseCase.execute(data);

		return response.sendStatus(201); //* status 201 - created
	}
}

export { CreateCategoryController };
