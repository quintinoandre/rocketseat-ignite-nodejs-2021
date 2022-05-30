import { Router } from 'express';

import { CreateSpecificationController } from '@modules/cars/useCases/createSpecification';
import { ensureAuthenticated } from '@shared/infra/http/middlewares';

const specificationsRoutes = Router();

specificationsRoutes.use(ensureAuthenticated);

specificationsRoutes.post('/', new CreateSpecificationController().handle);

export { specificationsRoutes };
