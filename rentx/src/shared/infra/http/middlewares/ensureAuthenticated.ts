import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import auth from '@config/auth';
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

	if (!token) throw new AppError('Token is missing', 401); //! status 401 - Unauthorized

	try {
		const { sub: user_id } = verify(token, auth.secretToken) as IPayload;

		request.user = { id: user_id };

		next();
	} catch (error) {
		throw new AppError('Invalid token', 401); //! status 401 - Unauthorized
	}
}

export { ensureAuthenticated };
