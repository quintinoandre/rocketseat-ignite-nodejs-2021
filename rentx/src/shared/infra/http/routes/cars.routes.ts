import { Router } from 'express';

import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController';
import {
	ensureAdmin,
	ensureAuthenticated,
} from '@shared/infra/http/middlewares';

const carsRoutes = Router();

carsRoutes.post(
	'/',
	ensureAuthenticated,
	ensureAdmin,
	new CreateCarController().handle
);

export { carsRoutes };
