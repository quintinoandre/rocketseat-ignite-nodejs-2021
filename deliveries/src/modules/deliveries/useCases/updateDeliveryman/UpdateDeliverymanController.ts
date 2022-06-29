import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateDeliverymanUseCase } from '.';

class UpdateDeliverymanController {
	async handle(request: Request, response: Response): Promise<Response> {
		const {
			params: { id: id_delivery },
			id_deliveryman,
		} = request;

		const updateDeliverymanUseCase = container.resolve(
			UpdateDeliverymanUseCase
		);

		const delivery = await updateDeliverymanUseCase.execute({
			id_delivery,
			id_deliveryman,
		});

		return response.json(delivery); //* status 200 - OK
	}
}

export { UpdateDeliverymanController };
