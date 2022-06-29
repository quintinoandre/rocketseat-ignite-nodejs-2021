import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import auth from '../../../../config/auth';
import { AppError } from '../../../erros';

interface IPayload {
	sub: string;
}

async function ensureAuthenticated(
	request: Request,
	_response: Response,
	next: NextFunction
) {
	const {
		headers: { authorization: authHeader },
	} = request;

	if (!authHeader) throw new AppError('Token is missing', 401); //! status 401 - Unauthorized

	const [, token] = authHeader.split(' ');

	try {
		const secretToken = auth.secretToken as string;

		const { sub } = verify(token, secretToken) as IPayload;

		request.id_client = sub;

		next();
	} catch (error) {
		throw new AppError('Invalid token', 401); //! status 401 - Unauthorized
	}
}

export { ensureAuthenticated };
