import { Router } from 'express';

import { CreateDeliveryController } from '../../../../modules/deliveries/useCases/createDelivery';

const deliveriesRoutes = Router();

deliveriesRoutes.post('/', new CreateDeliveryController().handle);

export { deliveriesRoutes };
