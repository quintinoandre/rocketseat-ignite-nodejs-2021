import { ICreateUserDTO } from '@modules/accounts/dtos';
import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory';
import { CreateUserUseCase } from '@modules/accounts/useCases/createUser';
import { AppError } from '@shared/erros';

import { AuthenticateUserUseCase } from '.';

let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
let authenticateUserUseCase: AuthenticateUserUseCase;

describe('Authenticate User', () => {
	beforeEach(() => {
		usersRepositoryInMemory = new UsersRepositoryInMemory();

		createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);

		authenticateUserUseCase = new AuthenticateUserUseCase(
			usersRepositoryInMemory
		);
	});

	it('should be able to authenticate an user', async () => {
		const user: ICreateUserDTO = {
			name: 'User Test',
			password: '1234',
			email: 'user@test.com',
			driver_license: '000123',
		};

		await createUserUseCase.execute(user);

		const result = await authenticateUserUseCase.execute({
			email: user.email,
			password: user.password,
		});

		expect(result).toHaveProperty('token');
	});

	it('should not be able to authenticate an inexistent user', async () => {
		expect(async () => {
			await authenticateUserUseCase.execute({
				email: 'false@email.com',
				password: '1234',
			});
		}).rejects.toBeInstanceOf(AppError);
	});

	it('should not be able to authenticate an user with wrong password', async () => {
		expect(async () => {
			const user: ICreateUserDTO = {
				name: 'User Test Error',
				password: '1234',
				email: 'user@user.com',
				driver_license: '9999',
			};

			await createUserUseCase.execute(user);

			await authenticateUserUseCase.execute({
				email: user.email,
				password: 'wrong',
			});
		}).rejects.toBeInstanceOf(AppError);
	});
});
