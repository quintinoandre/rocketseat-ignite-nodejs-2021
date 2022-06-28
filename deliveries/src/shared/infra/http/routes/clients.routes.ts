import { Router } from 'express';

import { CreateClientController } from '../../../../modules/clients/useCases/createClient';

const clientsRoutes = Router();

clientsRoutes.post('/', new CreateClientController().handle);

export { clientsRoutes };
