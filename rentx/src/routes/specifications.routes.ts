import { Router } from 'express';

import { createSpecificationController } from '../modules/cars/useCases';

const specificationsRoutes = Router();

specificationsRoutes.post('/', (request, response) =>
	createSpecificationController.handle(request, response)
);

export { specificationsRoutes };
