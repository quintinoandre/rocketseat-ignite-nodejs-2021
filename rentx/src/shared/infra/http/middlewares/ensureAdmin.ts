import { NextFunction, Request, Response } from 'express';

import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories';
import { AppError } from '@shared/erros';

async function ensureAdmin(
	request: Request,
	_response: Response,
	next: NextFunction
) {
	const {
		user: { id: userId },
	} = request;

	const usersRepository = new UsersRepository();

	const user = await usersRepository.findById(userId);

	if (!user.is_admin) throw new AppError('User is not admin', 401); //! status 401 - unauthorized

	return next();
}

export { ensureAdmin };
