import { Router } from 'express';

import { authenticateRoutes } from './authenticate.routes';
import { clientsRoutes } from './clients.routes';
import { deliveriesRoutes } from './deliveries.routes';
import { deliverymenRoutes } from './deliverymen.routes';

const router = Router();

router.use(authenticateRoutes);
router.use('/clients', clientsRoutes);
router.use('/deliverymen', deliverymenRoutes);
router.use('/deliveries', deliveriesRoutes);

export { router };
