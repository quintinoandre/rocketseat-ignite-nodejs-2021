import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateEndDateUseCase } from './UpdateEndDateUseCase';

class UpdateEndDateController {
	async handle(request: Request, response: Response): Promise<Response> {
		const {
			params: { id: id_delivery },
			id_deliveryman,
		} = request;

		const updateEndDateUseCase = container.resolve(UpdateEndDateUseCase);

		const delivery = await updateEndDateUseCase.execute({
			id_delivery,
			id_deliveryman,
		});

		return response.json(delivery); //* status 200 - OK
	}
}

export { UpdateEndDateController };
