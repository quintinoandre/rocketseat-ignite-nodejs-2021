import { ICreateUserDTO } from '@modules/accounts/dtos';
import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory';
import { CreateUserUseCase } from '@modules/accounts/useCases/createUser';
import { AppError } from '@shared/erros';

import { AuthenticateUserUseCase } from '.';

let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
let authenticateUserUseCase: AuthenticateUserUseCase;
let user: ICreateUserDTO;

describe('Authenticate User', () => {
	beforeEach(async () => {
		usersRepositoryInMemory = new UsersRepositoryInMemory();

		createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);

		authenticateUserUseCase = new AuthenticateUserUseCase(
			usersRepositoryInMemory
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
