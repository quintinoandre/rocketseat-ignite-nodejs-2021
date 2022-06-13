import { Router } from 'express';

import { AuthenticateUserController } from '@modules/accounts/useCases/authenticateUser';
import { RefreshTokenController } from '@modules/accounts/useCases/refreshToken';

const authenticateRoutes = Router();

authenticateRoutes.post('/sessions', new AuthenticateUserController().handle);

authenticateRoutes.post('/refresh-token', new RefreshTokenController().handle);

export { authenticateRoutes };
