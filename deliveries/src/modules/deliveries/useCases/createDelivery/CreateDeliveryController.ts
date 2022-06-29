import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateDeliveryUseCase } from '.';

class CreateDeliveryController {
	async handle(request: Request, response: Response): Promise<Response> {
		const {
			body: { item_name, id_client },
		} = request;

		const createDeliveryUseCase = container.resolve(CreateDeliveryUseCase);

		const delivery = await createDeliveryUseCase.execute({
			item_name,
			id_client,
		});

		return response.status(201).json(delivery); //* status 201 - Created
	}
}

export { CreateDeliveryController };
