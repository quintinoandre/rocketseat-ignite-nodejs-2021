import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateClientUseCase } from '.';

class CreateClientController {
	async handle(request: Request, response: Response): Promise<Response> {
		const {
			body: { username, password },
		} = request;

		const createClientUseCase = container.resolve(CreateClientUseCase);

		const client = await createClientUseCase.execute({ username, password });

		return response.status(201).json(client); //* status 201 - Created
	}
}

export { CreateClientController };
