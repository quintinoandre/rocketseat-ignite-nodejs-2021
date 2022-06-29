import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import auth from '../../../../config/auth';
import { AppError } from '../../../../shared/erros';
import { IDeliverymenRepository } from '../../../deliverymen/repositories';
import { IAuthenticateDeliverymanDTO } from '../../dtos';

@injectable()
class AuthenticateDeliverymanUseCase {
	constructor(
		@inject('DeliverymenRepository')
		private deliverymenRepository: IDeliverymenRepository
	) {}

	async execute({
		username,
		password,
	}: IAuthenticateDeliverymanDTO): Promise<string> {
		const deliveryman = await this.deliverymenRepository.findByUsername(
			username
		);

		if (!deliveryman) throw new AppError('Username or password invalid'); //! status 400 - Bad request

		const passwordMatched = await compare(password, deliveryman.password);

		if (!passwordMatched) throw new AppError('Username or password invalid'); //! status 400 - Bad request

		const secretToken = auth.secretToken as string;

		const token = sign({ username }, secretToken, {
			subject: deliveryman.id,
			expiresIn: auth.expiresIn,
		});

		return token;
	}
}

export { AuthenticateDeliverymanUseCase };
