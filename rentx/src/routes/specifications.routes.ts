import { Router } from 'express';

import { CreateSpecificationController } from '../modules/cars/useCases';

const specificationsRoutes = Router();

specificationsRoutes.post('/', new CreateSpecificationController().handle);

export { specificationsRoutes };
