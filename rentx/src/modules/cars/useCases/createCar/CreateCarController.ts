import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateCarUseCase } from '.';

class CreateCarController {
	async handle(request: Request, response: Response): Promise<Response> {
		const { body: data } = request;

		const createCarUseCase = container.resolve(CreateCarUseCase);

		const car = await createCarUseCase.execute(data);

		return response.status(201).json(car); //* Created
	}
}

export { CreateCarController };
