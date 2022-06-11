import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateCarSpecificationUseCase } from '.';

class CreateCarSpecificationController {
	async handle(request: Request, response: Response): Promise<Response> {
		const {
			params: { id: car_id },
			body: { specifications_id },
		} = request;

		const createCarSpecificationUseCase = container.resolve(
			CreateCarSpecificationUseCase
		);

		const car = await createCarSpecificationUseCase.execute({
			car_id,
			specifications_id,
		});

		return response.status(201).json(car); //* status 201 - Created
	}
}

export { CreateCarSpecificationController };
