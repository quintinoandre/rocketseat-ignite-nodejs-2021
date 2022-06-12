import { hash } from 'bcryptjs';
import request from 'supertest';
import { Connection } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { ICreateCategoryDTO } from '@modules/cars/dtos';
import { app } from '@shared/infra/http';
import createConnection from '@shared/infra/typeorm';

let connection: Connection;
let adminUser: {
	id: string;
	name: string;
	email: string;
	password: string;
	is_admin: boolean;
	driver_license: string;
};
let token: string;
let category: ICreateCategoryDTO;
let createdCategory;

describe('Create category controller', () => {
	beforeAll(async () => {
		connection = await createConnection();

		await connection.runMigrations();
	});

	beforeEach(async () => {
		const randomString = uuidV4();

		adminUser = {
			id: randomString,
			name: `Test Admin User Name ${randomString}`,
			email: `${randomString}@rentx.com`,
			password: await hash(randomString, 8),
			is_admin: true,
			driver_license: randomString,
		};

		await connection.query(
			`INSERT INTO users
			(id, name, email, password, is_admin, created_at, driver_license)
			VALUES('${adminUser.id}', '${adminUser.name}', '${adminUser.email}', '${adminUser.password}', '${adminUser.is_admin}', 'NOW()', '${adminUser.driver_license}')`
		);

		const authorizationResponse = await request(app).post('/sessions').send({
			email: adminUser.email,
			password: randomString,
		});

		token = authorizationResponse.body.token;

		category = {
			name: `Test Category Name ${randomString}`,
			description: `Test Category Description ${randomString}`,
		};

		createdCategory = await request(app)
			.post('/categories')
			.send({
				name: category.name,
				description: category.description,
			})
			.set({
				Authorization: `Bearer ${token}`,
			});
	});

	afterAll(async () => {
		await connection.dropDatabase();

		await connection.close();
	});

	it('Should be able to create a new category', async () => {
		expect(createdCategory.status).toBe(201);
	});

	it('should not be able to create a new category with the same name', async () => {
		const response = await request(app)
			.post('/categories')
			.send({
				name: category.name,
				description: 'Test Category Description',
			})
			.set({
				Authorization: `Bearer ${token}`,
			});

		expect(response.status).toBe(400);
	});
});
