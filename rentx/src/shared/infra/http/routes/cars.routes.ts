import { Router } from 'express';

import { CreateCarController } from '@modules/cars/useCases/createCar';
import { CreateCarSpecificationController } from '@modules/cars/useCases/createCarSpecification';
import { ListAvailableCarsController } from '@modules/cars/useCases/listAvailableCars';
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

carsRoutes.get('/available', new ListAvailableCarsController().handle);

carsRoutes.post(
	'/specifications/:id',
	ensureAuthenticated,
	ensureAdmin,
	new CreateCarSpecificationController().handle
);

export { carsRoutes };
