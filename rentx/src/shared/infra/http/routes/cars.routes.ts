import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';
import { CreateCarController } from '@modules/cars/useCases/createCar';
import { CreateCarSpecificationController } from '@modules/cars/useCases/createCarSpecification';
import { ListAvailableCarsController } from '@modules/cars/useCases/listAvailableCars';
import { UploadCarImagesController } from '@modules/cars/useCases/UploadCarImages';
import {
	ensureAdmin,
	ensureAuthenticated,
} from '@shared/infra/http/middlewares';

const carsRoutes = Router();

const upload = multer(uploadConfig.upload('./tmp/cars'));

carsRoutes.post(
	'/',
	ensureAuthenticated,
	ensureAdmin,
	new CreateCarController().handle
);

carsRoutes.get('/available', new ListAvailableCarsController().handle);

carsRoutes.post(
	'/specifications/:id',
	ensureAuthenticated,
	ensureAdmin,
	new CreateCarSpecificationController().handle
);

carsRoutes.post(
	'/images/:id',
	ensureAuthenticated,
	ensureAdmin,
	upload.array('images'),
	new UploadCarImagesController().handle
);

export { carsRoutes };
