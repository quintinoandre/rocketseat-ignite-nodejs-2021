import { Router } from 'express';

import { CreateDeliverymanController } from '../../../../modules/deliverymen/useCases/createDeliveryman';
import { FindAllDeliveriesController } from '../../../../modules/deliverymen/useCases/findAllDeliveries';
import { ensureAuthenticatedDeliveryman } from '../middlewares';

const deliverymenRoutes = Router();

deliverymenRoutes.post('/', new CreateDeliverymanController().handle);
deliverymenRoutes.get(
	'/deliveries',
	ensureAuthenticatedDeliveryman,
	new FindAllDeliveriesController().handle
);

export { deliverymenRoutes };
