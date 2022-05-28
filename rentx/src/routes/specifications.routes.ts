import { Router } from 'express';

import { ensureAuthenticated } from '../middlewares';
import { CreateSpecificationController } from '../modules/cars/useCases';

const specificationsRoutes = Router();

specificationsRoutes.use(ensureAuthenticated);

specificationsRoutes.post('/', new CreateSpecificationController().handle);

export { specificationsRoutes };
