import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { AuthenticateClientUseCase } from '.';

class AuthenticateClientController {
	async handle(request: Request, response: Response): Promise<Response> {
		const {
			body: { username, password },
		} = request;

		const authenticateClientUseCase = container.resolve(
			AuthenticateClientUseCase
		);

		const token = await authenticateClientUseCase.execute({
			username,
			password,
		});

		return response.json(token); //* status 200 - OK
	}
}

export { AuthenticateClientController };
