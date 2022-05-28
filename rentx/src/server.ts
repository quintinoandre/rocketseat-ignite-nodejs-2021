import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import swaggerUi from 'swagger-ui-express';

import './database';
import './shared/container';
import { AppError } from './erros';
import { router } from './routes';
import swaggerFile from './swagger.json';

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
