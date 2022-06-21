import { NextFunction, Request, Response } from 'express';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import { createClient } from 'redis';

import { AppError } from '@shared/erros';

const {
	env: { REDIS_HOST: host, REDIS_PORT },
} = process;

async function rateLimiter(
	request: Request,
	response: Response,
	next: NextFunction
): Promise<void> {
	const port = Number(REDIS_PORT);

	const redisClient = createClient({
		legacyMode: true,
		socket: { host, port },
	});

	await redisClient.connect();

	const rateLimiterRedis = new RateLimiterRedis({
		storeClient: redisClient,
		keyPrefix: 'rateLimiter',
		points: 10, // 10 requests
		duration: 5, // per 5 second by IP
	});

	try {
		await rateLimiterRedis.consume(request.ip);

		return next();
	} catch (error) {
		throw new AppError('Too Many Requests', 429); //! status 429 - Too Many Requests
	}
}

export { rateLimiter };
