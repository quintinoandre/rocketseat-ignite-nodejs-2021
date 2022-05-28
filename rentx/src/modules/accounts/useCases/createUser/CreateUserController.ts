import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateUserUseCase } from './CreateUserUseCase';

class CreateUserController {
	async handle(request: Request, response: Response): Promise<Response> {
		const { body: data } = request;

		const createUserUseCase = container.resolve(CreateUserUseCase);

		await createUserUseCase.execute({ ...data });

		return response.sendStatus(201); //* Created
	}
}

export { CreateUserController };
