import { hash } from 'bcryptjs';
import request from 'supertest';
import { Connection } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { app } from '@shared/infra/http';
import createConnection from '@shared/infra/typeorm';

let connection: Connection;

describe('List categories', () => {
	beforeAll(async () => {
		connection = await createConnection();

		await connection.runMigrations();

		const id = uuidV4();

		const password = await hash('admin', 8);

		await connection.query(
			`INSERT INTO users
			(id, name, email, password, is_admin, created_at, driver_license)
			VALUES('${id}', 'admin', 'admin@rentx.com', '${password}', true, 'NOW()', 'XXXXXX')`
		);
	});

	afterAll(async () => {
		await connection.dropDatabase();

		await connection.close();
	});

	it('Should be able to list all categories', async () => {
		const responseToken = await request(app).post('/sessions').send({
			email: 'admin@rentx.com',
			password: 'admin',
		});

		const {
			body: { token },
		} = responseToken;

		await request(app)
			.post('/categories')
			.send({
				name: 'Category supertest',
				description: 'Category supertest',
			})
			.set({
				Authorization: `Bearer ${token}`,
			});

		const response = await request(app).get('/categories');

		expect(response.status).toBe(200);
		expect(response.body.length).toBe(1);
		expect(response.body[0]).toHaveProperty('id');
		expect(response.body[0].name).toEqual('Category supertest');
	});
});
