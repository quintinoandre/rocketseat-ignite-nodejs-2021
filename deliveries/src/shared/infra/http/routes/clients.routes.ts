import { Router } from 'express';

import { CreateCLientController } from '../../../../modules/clients/useCases/createClient';

const clientsRoutes = Router();

clientsRoutes.post('/', new CreateCLientController().handle);

export { clientsRoutes };
