import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { DevolutionRentalUseCase } from '.';

class DevolutionRentalController {
	async handle(request: Request, response: Response): Promise<Response> {
		const {
			params: { id },
			user: { id: user_id },
		} = request;

		const devolutionRentalUseCase = container.resolve(DevolutionRentalUseCase);

		const rental = await devolutionRentalUseCase.execute({ id, user_id });

		return response.json(rental); //* status 200 - OK
	}
}

export { DevolutionRentalController };
