import { Router } from 'express';

import { CreateDeliverymanController } from '../../../../modules/deliverymen/useCases/createDeliveryman';

const deliverymenRoutes = Router();

deliverymenRoutes.post('/', new CreateDeliverymanController().handle);

export { deliverymenRoutes };
