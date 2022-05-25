import { Request, Response } from 'express';

import { CreateCategoryUseCase } from './CreateCategoryUseCase';

class CreateCategoryController {
	constructor(private createCategoryUseCase: CreateCategoryUseCase) {}

	handle(request: Request, response: Response): Response {
		const {
			body: { name, description },
		} = request;

		this.createCategoryUseCase.execute({ name, description });

		return response.sendStatus(201); //* Created
	}
}

export { CreateCategoryController };
