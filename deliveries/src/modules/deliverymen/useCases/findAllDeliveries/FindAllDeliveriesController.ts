import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { FindAllDeliveriesUseCase } from '.';

class FindAllDeliveriesController {
	async handle(request: Request, response: Response): Promise<Response> {
		const { id_deliveryman } = request;

		const findAllDeliveriesUseCase = container.resolve(
			FindAllDeliveriesUseCase
		);

		const deliveryman = await findAllDeliveriesUseCase.execute({
			id_deliveryman,
		});

		return response.json(deliveryman); //* status 200 - OK
	}
}

export { FindAllDeliveriesController };
