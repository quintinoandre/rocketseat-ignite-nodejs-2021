import { hash } from 'bcryptjs';
import { v4 as uuidV4 } from 'uuid';

import createConnection from '..';

(async function create() {
	const connection = await createConnection('localhost');

	const id = uuidV4();

	const password = await hash('admin', 8);

	await connection.query(
		`INSERT INTO users(id, name, email, password, is_admin, created_at, driver_license) values('${id}', 'admin', 'admin@rentx.com', '${password}', true, 'NOW()', 'XXXXXX')`
	);

	await connection.close();
})().then(() => console.log('User admin created'));
