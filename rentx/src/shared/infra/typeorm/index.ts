import { Connection, createConnection, getConnectionOptions } from 'typeorm';

const {
	env: { NODE_ENV },
} = process;

export default async (): Promise<Connection> => {
	const defaultOptions = await getConnectionOptions();

	return createConnection(
		Object.assign(defaultOptions, {
			database: NODE_ENV === 'test' ? 'rentx_test' : defaultOptions.database,
		})
	);
};
