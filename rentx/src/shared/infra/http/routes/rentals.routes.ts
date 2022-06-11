import { Router } from 'express';

import { CreateRentalController } from '@modules/rentals/useCases/createRental/CreateRentalController';
import { DevolutionRentalController } from '@modules/rentals/useCases/devolutionRental';
import { ensureAuthenticated } from '@shared/infra/http/middlewares';

const rentalsRoutes = Router();

rentalsRoutes.post(
	'/',
	ensureAuthenticated,
	new CreateRentalController().handle
);

rentalsRoutes.post(
	'/devolution/:id',
	ensureAuthenticated,
	new DevolutionRentalController().handle
);

export { rentalsRoutes };
