import { MigrationInterface, QueryRunner, Table } from 'typeorm';

class CreateRentals1654469560623 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		queryRunner.createTable(
			new Table({
				name: 'rentals',
				columns: [
					{ name: 'id', type: 'uuid', isPrimary: true },
					{ name: 'car_id', type: 'uuid' },
					{ name: 'user_id', type: 'uuid' },
					{ name: 'start_date', type: 'timestamp', default: 'now()' },
					{ name: 'end_date', type: 'timestamp' },
					{ name: 'expected_return_date', type: 'timestamp' },
					{ name: 'total', type: 'numeric' },
					{ name: 'created_at', type: 'timestamp', default: 'now()' },
					{ name: 'updated_at', type: 'timestamp', default: 'now()' },
				],
				foreignKeys: [
					{
						name: 'FKCarRental',
						referencedTableName: 'cars',
						referencedColumnNames: ['id'],
						columnNames: ['car_id'],
						onDelete: 'SET NULL',
						onUpdate: 'SET NULL',
					},
					{
						name: 'FKUserRental',
						referencedTableName: 'users',
						referencedColumnNames: ['id'],
						columnNames: ['user_id'],
						onDelete: 'SET NULL',
						onUpdate: 'SET NULL',
					},
				],
			})
		);

		/* await queryRunner.query(`
		CREATE TABLE rentals (
			id uuid PRIMARY KEY,
			car_id uuid NOT NULL,
			user_id uuid NOT NULL,
			start_date timestamp DEFAULT now() NOT NULL,
			end_date timestamp NOT NULL,
			expected_return_date timestamp NOT NULL,
			total numeric NOT NULL,
			created_at timestamp DEFAULT now() NOT NULL,
			updated_at timestamp DEFAULT now() NOT NULL,
			CONSTRAINT FKCarRental
			FOREIGN KEY (car_id)
			REFERENCES cars (id)
			ON DELETE SET NULL
			ON UPDATE SET NULL,
			CONSTRAINT FKUserRental
			FOREIGN KEY (user_id)
			REFERENCES users (id)
			ON DELETE SET NULL
			ON UPDATE SET NULL
		);
		`); */
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		queryRunner.dropTable('rentals');

		/* await queryRunner.query(`
			DROP TABLE rentals;
		`); */
	}
}

export { CreateRentals1654469560623 };
