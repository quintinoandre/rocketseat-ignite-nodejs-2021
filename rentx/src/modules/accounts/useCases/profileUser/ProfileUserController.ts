import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ProfileUserUseCase } from '.';

class ProfileUserController {
	async handle(request: Request, response: Response): Promise<Response> {
		const {
			user: { id: user_id },
		} = request;

		const profileUserController = container.resolve(ProfileUserUseCase);

		const user = await profileUserController.execute({ user_id });

		return response.json(user); //* status 200 - OK
	}
}

export { ProfileUserController };
