import { ICreateUserDTO } from '@modules/accounts/dtos';
import {
	UsersRepositoryInMemory,
	UsersTokensRepositoryInMemory,
} from '@modules/accounts/repositories/in-memory';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations';
import { MailProviderInMemory } from '@shared/container/providers/MailProvider/in-memory';
import { AppError } from '@shared/erros';

import { SendForgotPasswordMailUseCase } from '.';

let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;
let mailProviderInMemory: MailProviderInMemory;
let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let user: ICreateUserDTO;

describe('Send Forgot Password Mail', () => {
	beforeEach(async () => {
		usersRepositoryInMemory = new UsersRepositoryInMemory();

		usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();

		dayjsDateProvider = new DayjsDateProvider();

		mailProviderInMemory = new MailProviderInMemory();

		sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
			usersRepositoryInMemory,
			usersTokensRepositoryInMemory,
			dayjsDateProvider,
			mailProviderInMemory
		);

		user = {
			name: 'User Test',
			password: 'test_password',
			email: `user@test.com`,
			driver_license: 'test_driver_license',
		};

		await usersRepositoryInMemory.create(user);
	});

	it('Should be able to send forgot password mail to user', async () => {
		const sendMail = jest.spyOn(mailProviderInMemory, 'sendMail');

		await sendForgotPasswordMailUseCase.execute({ email: user.email });

		expect(sendMail).toHaveBeenCalled();
	});

	it('Should not be able to send forgot password mail to a non-existing user', async () => {
		await expect(
			sendForgotPasswordMailUseCase.execute({ email: 'fake_email@test.com' })
		).rejects.toEqual(new AppError('User does not exists', 404));
	});

	it('Should be able to create an user token', async () => {
		const generateTokenEmail = jest.spyOn(
			usersTokensRepositoryInMemory,
			'create'
		);

		await sendForgotPasswordMailUseCase.execute({ email: user.email });

		expect(generateTokenEmail).toHaveBeenCalled();
	});
});
