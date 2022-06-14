import { ICreateUserDTO } from '@modules/accounts/dtos';
import {
	UsersRepositoryInMemory,
	UsersTokensRepositoryInMemory,
} from '@modules/accounts/repositories/in-memory';
import { CreateUserUseCase } from '@modules/accounts/useCases/createUser';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations';
import { AppError } from '@shared/erros';

import { AuthenticateUserUseCase } from '.';

let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
let dayjsDateProvider: DayjsDateProvider;
let authenticateUserUseCase: AuthenticateUserUseCase;
let user: ICreateUserDTO;

describe('Authenticate User', () => {
	beforeEach(async () => {
		usersRepositoryInMemory = new UsersRepositoryInMemory();

		usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();

		createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);

		dayjsDateProvider = new DayjsDateProvider();

		authenticateUserUseCase = new AuthenticateUserUseCase(
			usersRepositoryInMemory,
			usersTokensRepositoryInMemory,
			dayjsDateProvider
		);

		user = {
			name: 'User Test',
			password: 'test_password',
			email: `user@test.com`,
			driver_license: 'test_driver_license',
		};

		await createUserUseCase.execute(user);
	});

	it('Should be able to authenticate user', async () => {
		const result = await authenticateUserUseCase.execute({
			email: user.email,
			password: user.password,
		});

		expect(result).toHaveProperty('token');
	});

	it('Should not be able to authenticate an inexistent user', async () => {
		await expect(
			authenticateUserUseCase.execute({
				email: 'fakeemail@test.com',
				password: 'fakepassword',
			})
		).rejects.toEqual(new AppError('Email or password incorrect'));
	});

	it('Should not be able to authenticate an user with wrong password', async () => {
		await expect(
			authenticateUserUseCase.execute({
				email: user.email,
				password: 'fakepassword',
			})
		).rejects.toEqual(new AppError('Email or password incorrect'));
	});
});
