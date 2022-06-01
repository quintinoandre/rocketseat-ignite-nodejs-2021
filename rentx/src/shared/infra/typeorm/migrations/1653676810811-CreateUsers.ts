import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUsers1653676810811 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'users',
				columns: [
					{ name: 'id', type: 'uuid', isPrimary: true },
					{ name: 'name', type: 'varchar' },
					{ name: 'username', type: 'varchar', isUnique: true },
					{ name: 'password', type: 'varchar' },
					{ name: 'email', type: 'varchar' },
					{ name: 'driver_license', type: 'varchar' },
					{ name: 'is_admin', type: 'boolean', default: false },
					{ name: 'created_at', type: 'timestamp', default: 'now()' },
				],
			})
		);

		/* await queryRunner.query(`
		CREATE TABLE IF NOT EXISTS users(
			id uuid PRIMARY KEY,
			name varchar NOT NULL,
			username varchar UNIQUE NOT NULL,
			password varchar NOT NULL,
			email varchar NOT NULL,
			driver_license varchar NOT NULL,
			is_admin boolean DEFAULT false NOT NULL,
			created_at timestamp DEFAULT now() NOT NULL
		);
		`); */
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('users');

		/* await queryRunner.query(`
		DROP TABLE IF EXISTS users;
		`); */
	}
}
