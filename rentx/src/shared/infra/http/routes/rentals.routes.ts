import { Router } from 'express';

import { CreateRentalController } from '@modules/rentals/useCases/createRental/CreateRentalController';
import { ensureAuthenticated } from '@shared/infra/http/middlewares';

const rentalsRoutes = Router();

rentalsRoutes.post(
	'/',
	ensureAuthenticated,
	new CreateRentalController().handle
);

export { rentalsRoutes };
