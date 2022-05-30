import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import swaggerUi from 'swagger-ui-express';

import '@shared/infra/typeorm';
import '@shared/container';

import { AppError } from '@shared/erros';

import swaggerFile from '../../../swagger.json';
import { router } from './routes';

const app = express();

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router);

app.use(
	(error: Error, request: Request, response: Response, _next: NextFunction) => {
		if (error instanceof AppError)
			return response
				.status(error.statusCode)
				.json({ status: 'error', message: error.message });

		return response.status(500).json({
			status: 'error',
			message: `Internal server error - ${error.message}`,
		});
	}
);

const PORT = 3333;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
