import { Router } from 'express';

import { CreateSpecificationController } from '@modules/cars/useCases/createSpecification';
import {
	ensureAdmin,
	ensureAuthenticated,
} from '@shared/infra/http/middlewares';

const specificationsRoutes = Router();

specificationsRoutes.post(
	'/',
	ensureAuthenticated,
	ensureAdmin,
	new CreateSpecificationController().handle
);

export { specificationsRoutes };
