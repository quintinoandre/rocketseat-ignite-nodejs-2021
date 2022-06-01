import { Router } from 'express';

import { CreateCarController } from '@modules/cars/useCases/createCar';
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

export { carsRoutes };
