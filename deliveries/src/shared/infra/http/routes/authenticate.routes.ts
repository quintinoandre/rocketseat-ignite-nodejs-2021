import { Router } from 'express';

import { AuthenticateClientController } from '../../../../modules/accounts/useCases/authenticateClient';
import { AuthenticateDeliverymanController } from '../../../../modules/accounts/useCases/authenticateDeliveryman';

const authenticateRoutes = Router();

authenticateRoutes.post(
	'/client/authenticate',
	new AuthenticateClientController().handle
);
authenticateRoutes.post(
	'/deliveryman/authenticate',
	new AuthenticateDeliverymanController().handle
);

export { authenticateRoutes };
