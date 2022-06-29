import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { AuthenticateDeliverymanUseCase } from '.';

class AuthenticateDeliverymanController {
	async handle(request: Request, response: Response): Promise<Response> {
		const {
			body: { username, password },
		} = request;

		const authenticateDeliverymanUseCase = container.resolve(
			AuthenticateDeliverymanUseCase
		);

		const token = await authenticateDeliverymanUseCase.execute({
			username,
			password,
		});

		return response.json(token); //* status 200 - OK
	}
}

export { AuthenticateDeliverymanController };
