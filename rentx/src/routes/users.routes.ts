import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';
import { ensureAuthenticated } from '@middlewares';
import {
	CreateUserController,
	UpdateUserAvatarController,
} from '@modules/accounts/useCases';

const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig.upload('./tmp/avatar'));

usersRoutes.post('/', new CreateUserController().handle);

usersRoutes.patch(
	'/avatar',
	ensureAuthenticated,
	uploadAvatar.single('avatar'),
	new UpdateUserAvatarController().handle
);

export { usersRoutes };
