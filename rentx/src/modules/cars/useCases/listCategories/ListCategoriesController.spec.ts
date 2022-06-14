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
let refreshToken: string;
let category: ICreateCategoryDTO;

describe('List categories', () => {
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

		refreshToken = authorizationResponse.body.refreshToken;

		category = {
			name: `Test Category Name ${randomString}`,
			description: `Test Category Description ${randomString}`,
		};

		await request(app)
			.post('/categories')
			.send({
				name: category.name,
				description: category.description,
			})
			.set({
				Authorization: `Bearer ${refreshToken}`,
			});
	});

	afterAll(async () => {
		await connection.dropDatabase();

		await connection.close();
	});

	it('Should be able to list all categories', async () => {
		const response = await request(app).get('/categories');

		expect(response.status).toBe(200);
		/* expect(response.body.length).toBe(1);
		expect(response.body[0]).toHaveProperty('id');
		expect(response.body[0].name).toEqual(category.name); */
	});
});
