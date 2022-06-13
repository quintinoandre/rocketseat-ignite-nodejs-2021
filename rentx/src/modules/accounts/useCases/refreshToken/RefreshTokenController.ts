import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { RefreshTokenUseCase } from '.';

class RefreshTokenController {
	async handle(request: Request, response: Response): Promise<Response> {
		const { body, headers, query } = request;

		const token = body.token || headers['x-access-token'] || query.token;

		const refreshTokenUseCase = container.resolve(RefreshTokenUseCase);

		const refreshToken = await refreshTokenUseCase.execute({ token });

		return response.json(refreshToken); //* status 200 - OK
	}
}

export { RefreshTokenController };
