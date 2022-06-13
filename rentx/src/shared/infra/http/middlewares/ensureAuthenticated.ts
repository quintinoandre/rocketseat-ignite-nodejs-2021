import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import auth from '@config/auth';
import { UsersTokensRepository } from '@modules/accounts/infra/typeorm/repositories';
import { AppError } from '@shared/erros';

interface IPayload {
	sub: string;
}

async function ensureAuthenticated(
	request: Request,
	reponse: Response,
	next: NextFunction
) {
	const {
		headers: { authorization: authHeader },
	} = request;

	const [, token] = authHeader.split(' ');

	const usersTokensRepository = new UsersTokensRepository();

	if (!token) throw new AppError('Token is missing', 401); //! status 401 - Unauthorized

	try {
		const { sub: user_id } = verify(token, auth.secretRefreshToken) as IPayload;

		const user = await usersTokensRepository.findByUserIdAndRefreshToken(
			user_id,
			token
		);

		if (!user) throw new AppError('User does not exists', 401); //! status 401 - Unauthorized

		request.user = { id: user_id };

		next();
	} catch (error) {
		throw new AppError('Invalid token', 401); //! status 401 - Unauthorized
	}
}

export { ensureAuthenticated };
