import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateDeliverymanUseCase } from '.';

class CreateDeliverymanController {
	async handle(request: Request, response: Response): Promise<Response> {
		const {
			body: { username, password },
		} = request;

		const createDeliverymanUseCase = container.resolve(
			CreateDeliverymanUseCase
		);

		const deliveryman = await createDeliverymanUseCase.execute({
			username,
			password,
		});

		return response.status(201).json(deliveryman); //* status 201 - Created
	}
}

export { CreateDeliverymanController };
