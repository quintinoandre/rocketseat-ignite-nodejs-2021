import { Router } from 'express';

import { CreateDeliveryController } from '../../../../modules/deliveries/useCases/createDelivery';
import { ensureAuthenticated } from '../middlewares';

const deliveriesRoutes = Router();

deliveriesRoutes.post(
	'/',
	ensureAuthenticated,
	new CreateDeliveryController().handle
);

export { deliveriesRoutes };
