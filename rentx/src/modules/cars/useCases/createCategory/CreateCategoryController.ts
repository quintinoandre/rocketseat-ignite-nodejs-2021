import { Request, Response } from 'express';

import { CreateCategoryUseCase } from './CreateCategoryUseCase';

class CreateCategoryController {
	constructor(private createCategoryUseCase: CreateCategoryUseCase) {}

	async handle(request: Request, response: Response): Promise<Response> {
		const {
			body: { name, description },
		} = request;

		await this.createCategoryUseCase.execute({ name, description });

		return response.sendStatus(201); //* Created
	}
}

export { CreateCategoryController };
