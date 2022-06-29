import { Router } from 'express';

import { CreateDeliveryController } from '../../../../modules/deliveries/useCases/createDelivery';
import { FindAllAvailableController } from '../../../../modules/deliveries/useCases/FindAllAvailable';
import { UpdateDeliverymanController } from '../../../../modules/deliveries/useCases/updateDeliveryman';
import { UpdateEndDateController } from '../../../../modules/deliveries/useCases/updateEndDate';
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
deliveriesRoutes.patch(
	'/updateDeliveryman/:id',
	ensureAuthenticatedDeliveryman,
	new UpdateDeliverymanController().handle
);
deliveriesRoutes.patch(
	'/updateEndDate/:id',
	ensureAuthenticatedDeliveryman,
	new UpdateEndDateController().handle
);

export { deliveriesRoutes };
