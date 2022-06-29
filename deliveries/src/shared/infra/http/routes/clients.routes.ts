import { Router } from 'express';

import { CreateClientController } from '../../../../modules/clients/useCases/createClient';
import { FindAllDeliveriesController } from '../../../../modules/clients/useCases/findAllDeliveries';
import { ensureAuthenticatedClient } from '../middlewares';

const clientsRoutes = Router();

clientsRoutes.post('/', new CreateClientController().handle);
clientsRoutes.get(
	'/deliveries',
	ensureAuthenticatedClient,
	new FindAllDeliveriesController().handle
);

export { clientsRoutes };
