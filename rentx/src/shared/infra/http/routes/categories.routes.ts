import { Router } from 'express';
import multer from 'multer';

import { CreateCategoryController } from '@modules/cars/useCases/createCategory';
import { ImportCategoryController } from '@modules/cars/useCases/importCategory';
import { ListCategoriesController } from '@modules/cars/useCases/listCategories';
import {
	ensureAdmin,
	ensureAuthenticated,
} from '@shared/infra/http/middlewares';

const categoriesRoutes = Router();

const upload = multer({ dest: './tmp' });

categoriesRoutes.post(
	'/',
	ensureAuthenticated,
	ensureAdmin,
	new CreateCategoryController().handle
);

categoriesRoutes.get('/', new ListCategoriesController().handle);

categoriesRoutes.post(
	'/import',
	ensureAuthenticated,
	ensureAdmin,
	upload.single('file'),
	new ImportCategoryController().handle
);

export { categoriesRoutes };
