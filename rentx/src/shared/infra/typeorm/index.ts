import { Connection, createConnection, getConnectionOptions } from 'typeorm';

const {
	env: { NODE_ENV },
} = process;

export default async (host = 'database_ignite'): Promise<Connection> => {
	const defaultOptions = await getConnectionOptions();

	return createConnection(
		Object.assign(defaultOptions, {
			host: NODE_ENV === 'test' ? 'localhost' : host,
			databas: NODE_ENV === 'test' ? 'rentx_test' : defaultOptions.database,
		})
	);
};
