import { Router } from 'express';

import { AuthenticateClientController } from '../../../../modules/accounts/useCases/authenticateClient';

const authenticateRoutes = Router();

authenticateRoutes.post('/', new AuthenticateClientController().handle);

export { authenticateRoutes };
