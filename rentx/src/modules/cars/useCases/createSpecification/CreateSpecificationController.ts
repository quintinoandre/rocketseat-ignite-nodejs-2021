import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateSpecificationUseCase } from './CreateSpecificationUseCase';

class CreateSpecificationController {
	handle(request: Request, response: Response): Response {
		const {
			body: { name, description },
		} = request;

		const createSpecificationUseCase = container.resolve(
			CreateSpecificationUseCase
		);

		createSpecificationUseCase.execute({ name, description });

		return response.sendStatus(201); //* Created
	}
}

export { CreateSpecificationController };
