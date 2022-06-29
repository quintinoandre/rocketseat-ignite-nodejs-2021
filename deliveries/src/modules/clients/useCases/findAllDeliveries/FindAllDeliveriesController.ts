import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { FindAllDeliveriesUseCase } from '.';

class FindAllDeliveriesController {
	async handle(request: Request, response: Response): Promise<Response> {
		const { id_client } = request;

		const findAllDeliveriesUseCase = container.resolve(
			FindAllDeliveriesUseCase
		);

		const client = await findAllDeliveriesUseCase.execute({ id_client });

		return response.json(client); //* status 200 - OK
	}
}

export { FindAllDeliveriesController };
