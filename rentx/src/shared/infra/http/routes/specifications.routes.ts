import { Router } from 'express';

import { CreateSpecificationController } from '@modules/cars/useCases';
import { ensureAuthenticated } from '@shared/infra';

const specificationsRoutes = Router();

specificationsRoutes.use(ensureAuthenticated);

specificationsRoutes.post('/', new CreateSpecificationController().handle);

export { specificationsRoutes };
