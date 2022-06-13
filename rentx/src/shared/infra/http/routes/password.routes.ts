import { Router } from 'express';

import { ResetPasswordUserController } from '@modules/accounts/useCases/resetPasswordUser';
import { SendForgotPasswordMailController } from '@modules/accounts/useCases/sendForgotPasswordMail';

const passwordRoutes = Router();

passwordRoutes.post('/forgot', new SendForgotPasswordMailController().handle);

passwordRoutes.post('/reset', new ResetPasswordUserController().handle);

export { passwordRoutes };
