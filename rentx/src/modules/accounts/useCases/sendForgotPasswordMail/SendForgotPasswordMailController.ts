import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { SendForgotPasswordMailUseCase } from '.';

class SendForgotPasswordMailController {
	async handle(request: Request, response: Response): Promise<Response> {
		const { body: data } = request;

		const sendForgotPasswordMailUseCase = container.resolve(
			SendForgotPasswordMailUseCase
		);

		await sendForgotPasswordMailUseCase.execute(data);

		return response.send();
	}
}

export { SendForgotPasswordMailController };
