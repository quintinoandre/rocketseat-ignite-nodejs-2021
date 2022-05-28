import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import { UsersRepository } from '../modules/accounts/repositories';

interface IPayload {
	sub: string;
}

function ensureAuthenticated(
	request: Request,
	reponse: Response,
	next: NextFunction
) {
	const {
		headers: { authorization: authHeader },
	} = request;

	if (!authHeader) throw new Error('Token is missing');

	const [, token] = authHeader.split(' ');

	try {
		const { sub: user_id } = verify(
			token,
			'hmrRKeqsipSK74YFqqA5k9Ynnes3pmnQ'
		) as IPayload;

		const usersRepository = new UsersRepository();

		const user = usersRepository.findById(user_id);

		if (!user) throw new Error('User does not exists');

		next();
	} catch (error) {
		throw new Error('Invalid token');
	}
}

export { ensureAuthenticated };
