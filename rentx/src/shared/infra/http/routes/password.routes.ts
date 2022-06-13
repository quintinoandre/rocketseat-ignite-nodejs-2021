import { Router } from 'express';

import { SendForgotPasswordMailController } from '@modules/accounts/useCases/sendForgotPasswordMail';

const passwordRoutes = Router();

passwordRoutes.post('/forgot', new SendForgotPasswordMailController().handle);

export { passwordRoutes };
