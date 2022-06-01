import { MigrationInterface, QueryRunner, Table } from 'typeorm';

class CreateSpecifications1653605504101 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'specifications',
				columns: [
					{ name: 'id', type: 'uuid', isPrimary: true },
					{ name: 'name', type: 'varchar' },
					{ name: 'description', type: 'varchar' },
					{ name: 'created_at', type: 'timestamp', default: 'now()' },
				],
			})
		);

		/* await queryRunner.query(`
		CREATE TABLE IF NOT EXISTS specifications (
			id uuid PRIMARY KEY,
			name varchar NOT NULL,
			description varchar NOT NULL,
			created_at timestamp DEFAULT now() NOT NULL
		);
		`); */
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('specifications');

		/* await queryRunner.query(`
		DROP TABLE IF EXISTS specifications;
		`); */
	}
}

export { CreateSpecifications1653605504101 };
