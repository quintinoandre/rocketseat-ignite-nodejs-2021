import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories';
import { AppError } from '@shared/erros';

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

	if (!authHeader) throw new AppError('Token is missing', 401); //! status 401 - unauthorized

	const [, token] = authHeader.split(' ');

	try {
		const { sub: user_id } = verify(
			token,
			'hmrRKeqsipSK74YFqqA5k9Ynnes3pmnQ'
		) as IPayload;

		const usersRepository = new UsersRepository();

		const user = usersRepository.findById(user_id);

		if (!user) throw new AppError('User does not exists', 401); //! status 401 - unauthorized

		request.user = { id: user_id };

		next();
	} catch (error) {
		throw new AppError('Invalid token', 401); //! status 401 - unauthorized
	}
}

export { ensureAuthenticated };
