import { Router } from 'express';

import {
	CreateUserController,
	UpdateUserAvatarController,
} from '../modules/accounts/useCases';

const usersRoutes = Router();

usersRoutes.post('/', new CreateUserController().handle);

usersRoutes.patch('/avatar', new UpdateUserAvatarController().handle);

export { usersRoutes };
