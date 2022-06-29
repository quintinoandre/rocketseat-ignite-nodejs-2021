import { Router } from 'express';

import { CreateDeliveryController } from '../../../../modules/deliveries/useCases/createDelivery';
import { FindAllAvailableController } from '../../../../modules/deliveries/useCases/FindAllAvailable';
import { ensureAuthenticated } from '../middlewares';

const deliveriesRoutes = Router();

deliveriesRoutes.post(
	'/',
	ensureAuthenticated,
	new CreateDeliveryController().handle
);

deliveriesRoutes.get('/available', new FindAllAvailableController().handle);

export { deliveriesRoutes };
