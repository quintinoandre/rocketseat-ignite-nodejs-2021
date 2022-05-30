import { Router } from 'express';

import { AuthenticateUserController } from '@modules/accounts/useCases';

const authenticateRoutes = Router();

authenticateRoutes.post('/sessions', new AuthenticateUserController().handle);

export { authenticateRoutes };
