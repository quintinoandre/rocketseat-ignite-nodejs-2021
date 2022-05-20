import { Router } from 'express';

import { SpecificationsRepository } from '../modules/cars/repositories';
import { CreateSpecificationService } from '../modules/cars/services';

const specificationsRoutes = Router();

const specificationsRepository = new SpecificationsRepository();

specificationsRoutes.post('/', (request, response) => {
	const {
		body: { name, description },
	} = request;

	const createSpecificationsCreate = new CreateSpecificationService(
		specificationsRepository
	);

	createSpecificationsCreate.execute({ name, description });

	return response.sendStatus(201); //* Created
});

export { specificationsRoutes };
