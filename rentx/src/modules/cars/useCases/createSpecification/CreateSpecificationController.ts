import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateSpecificationUseCase } from '.';

class CreateSpecificationController {
	async handle(request: Request, response: Response): Promise<Response> {
		const { body: data } = request;

		const createSpecificationUseCase = container.resolve(
			CreateSpecificationUseCase
		);

		await createSpecificationUseCase.execute(data);

		return response.sendStatus(201); //* status 201 - Created
	}
}

export { CreateSpecificationController };
