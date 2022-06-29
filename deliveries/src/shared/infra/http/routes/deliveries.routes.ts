import { Router } from 'express';

import { CreateDeliveryController } from '../../../../modules/deliveries/useCases/createDelivery';
import { FindAllAvailableController } from '../../../../modules/deliveries/useCases/FindAllAvailable';
import {
	ensureAuthenticatedClient,
	ensureAuthenticatedDeliveryman,
} from '../middlewares';

const deliveriesRoutes = Router();

deliveriesRoutes.post(
	'/',
	ensureAuthenticatedClient,
	new CreateDeliveryController().handle
);

deliveriesRoutes.get(
	'/available',
	ensureAuthenticatedDeliveryman,
	new FindAllAvailableController().handle
);

export { deliveriesRoutes };
