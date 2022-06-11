import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListRentalsByUserUserCase } from '.';

class ListRentalsByUserController {
	async handle(request: Request, response: Response): Promise<Response> {
		const {
			user: { id: user_id },
		} = request;

		const listRentalsByUserUserCase = container.resolve(
			ListRentalsByUserUserCase
		);

		const rentals = await listRentalsByUserUserCase.execute({ user_id });

		return response.json(rentals); //* status 200 - OK
	}
}

export { ListRentalsByUserController };
