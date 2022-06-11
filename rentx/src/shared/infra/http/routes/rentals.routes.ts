import { Router } from 'express';

import { CreateRentalController } from '@modules/rentals/useCases/createRental';
import { DevolutionRentalController } from '@modules/rentals/useCases/devolutionRental';
import { ListRentalsByUserController } from '@modules/rentals/useCases/listRentalsByUser';
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

rentalsRoutes.get(
	'/user',
	ensureAuthenticated,
	new ListRentalsByUserController().handle
);

export { rentalsRoutes };
