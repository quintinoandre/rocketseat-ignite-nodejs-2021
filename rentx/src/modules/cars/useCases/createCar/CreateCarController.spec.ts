import request from 'supertest';

import { app } from '@shared/infra/http';

describe('Create category controller', () => {
	it('Should be able to create a new category', async () => {
		const response = await request(app).post('/categories').send({
			name: 'Category supertest',
			description: 'Category supertest',
		});

		expect(response.status).toBe(201);
	});
});
