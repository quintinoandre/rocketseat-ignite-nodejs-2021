import { MigrationInterface, QueryRunner, Table } from 'typeorm';

class CreateCars1653938018136 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'cars',
				columns: [
					{ name: 'id', type: 'uuid', isPrimary: true },
					{ name: 'name', type: 'varchar' },
					{ name: 'description', type: 'varchar' },
					{ name: 'daily_rate', type: 'numeric' },
					{ name: 'available', type: 'boolean', default: true },
					{ name: 'license_plate', type: 'varchar' },
					{ name: 'fine_amount', type: 'numeric' },
					{ name: 'brand', type: 'varchar' },
					{ name: 'category_id', type: 'uuid', isNullable: true },
					{ name: 'created_at', type: 'timestamp', default: 'now()' },
				],
				foreignKeys: [
					{
						name: 'FKCategoryCar',
						referencedTableName: 'categories',
						referencedColumnNames: ['id'],
						columnNames: ['category_id'],
						onDelete: 'SET NULL',
						onUpdate: 'SET NULL',
					},
				],
			})
		);

		/* await queryRunner.query(`
		CREATE TABLE cars (
			id uuid PRIMARY KEY,
			name varchar NOT NULL,
			description varchar NOT NULL,
			daily_rate numeric NOT NULL,
			available boolean DEFAULT true NOT NULL,
			license_plate varchar NOT NULL,
			fine_amount numeric NOT NULL,
			brand varchar NOT NULL,
			category_id uuid,
			created_at timestamp DEFAULT now() NOT NULL
		);
		`);

		await queryRunner.query(`
		ALTER TABLE cars
		ADD CONSTRAINT FKCategoryCar
		FOREIGN KEY (category_id)
		REFERENCES categories (id)
		ON DELETE SET NULL
		ON UPDATE SET NULL;
		`); */
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('cars');

		/* await queryRunner.query(`
		ALTER TABLE cars
		DROP CONSTRAINT FKCategoryCar;
		`);

		await queryRunner.query(`
		DROP TABLE cars;
		`); */
	}
}

export { CreateCars1653938018136 };
