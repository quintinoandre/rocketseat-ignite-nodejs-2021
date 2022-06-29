import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { FindAllAvailableUseCase } from '.';

class FindAllAvailableController {
	async handle(request: Request, response: Response): Promise<Response> {
		const findAllAvailableUseCase = container.resolve(FindAllAvailableUseCase);

		const deliveries = await findAllAvailableUseCase.execute();

		return response.json(deliveries); //* status 200 - OK
	}
}

export { FindAllAvailableController };
