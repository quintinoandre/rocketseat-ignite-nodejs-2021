import { Router } from 'express';
import multer from 'multer';

import {
	CreateCategoryController,
	ImportCategoryController,
	ListCategoriesController,
} from '@modules/cars/useCases';

const categoriesRoutes = Router();

const upload = multer({ dest: './tmp' });

categoriesRoutes.post('/', new CreateCategoryController().handle);

categoriesRoutes.get('/', new ListCategoriesController().handle);

categoriesRoutes.post(
	'/import',
	upload.single('file'),
	new ImportCategoryController().handle
);

export { categoriesRoutes };
