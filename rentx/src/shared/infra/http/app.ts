import 'reflect-metadata';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import swaggerUi from 'swagger-ui-express';

import upload from '@config/upload';
import * as Sentry from '@sentry/node';
import * as Tracing from '@sentry/tracing';
import { AppError } from '@shared/erros';
import { rateLimiter } from '@shared/infra/http/middlewares';
import createConnection from '@shared/infra/typeorm';
import '@shared/container';

import swaggerFile from '../../../swagger.json';
import { router } from './routes';

const {
	env: { SENTRY_DSN },
} = process;

createConnection();

const app = express();

app.use(rateLimiter);

Sentry.init({
	dsn: SENTRY_DSN,
	integrations: [
		new Sentry.Integrations.Http({ tracing: true }),
		new Tracing.Integrations.Express({ app }),
	],
	tracesSampleRate: 1.0,
});

app.use(Sentry.Handlers.requestHandler());

app.use(Sentry.Handlers.tracingHandler());

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use('/avatar', express.static(`${upload.tmpFolder}/avatar`));

app.use('/cars', express.static(`${upload.tmpFolder}/cars`));

app.use(cors());

app.use(router);

app.use(Sentry.Handlers.errorHandler());

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

export { app };
