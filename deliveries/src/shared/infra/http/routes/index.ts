import { Router } from 'express';

import { authenticateRoutes } from './authenticate.routes';
import { clientsRoutes } from './clients.routes';

const router = Router();

router.use('/authenticate', authenticateRoutes);
router.use('/clients', clientsRoutes);

export { router };
