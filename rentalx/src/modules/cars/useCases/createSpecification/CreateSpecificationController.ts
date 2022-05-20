import { Request, Response } from 'express';

import { CreateSpecificationUseCase } from './CreateSpecificationUseCase';

class CreateSpecificationController {
	constructor(private createSpecificationUseCase: CreateSpecificationUseCase) {}

	handle(request: Request, response: Response): Response {
		const {
			body: { name, description },
		} = request;

		this.createSpecificationUseCase.execute({ name, description });

		return response.sendStatus(201); //* Created
	}
}

export { CreateSpecificationController };
