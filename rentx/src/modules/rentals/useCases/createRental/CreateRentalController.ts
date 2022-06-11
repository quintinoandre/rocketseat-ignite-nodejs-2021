import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateRentalUseCase } from './CreateRentalUseCase';

class CreateRentalController {
	async handle(request: Request, response: Response): Promise<Response> {
		const {
			body: data,
			user: { id: user_id },
		} = request;

		const createRentalUseCase = container.resolve(CreateRentalUseCase);

		const rental = await createRentalUseCase.execute({ ...data, user_id });

		return response.status(201).json(rental); //* status 201 - Created
	}
}

export { CreateRentalController };
