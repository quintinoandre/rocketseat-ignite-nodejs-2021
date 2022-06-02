import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateCarImages1654172320282 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'cars_image',
				columns: [
					{ name: 'id', type: 'uuid', isPrimary: true },
					{ name: 'car_id', type: 'uuid' },
					{ name: 'image_name', type: 'varchar' },
					{ name: 'created_at', type: 'timestamp', default: 'now()' },
				],
				foreignKeys: [
					{
						name: 'FKCarImage',
						referencedTableName: 'cars',
						referencedColumnNames: ['id'],
						columnNames: ['car_id'],
						onDelete: 'SET NULL',
						onUpdate: 'SET NULL',
					},
				],
			})
		);

		/* await queryRunner.query(`
		CREATE TABLE cars_image (
			id uuid PRIMARY KEY,
			car_id uuid NOT NULL,
			image_name varchar NOT NULL,
			created_at timestamp DEFAULT now() NOT NULL
		);
		`);

		await queryRunner.query(`
		ALTER TABLE cars_image
		ADD CONSTRAINT FKCarImage
		FOREIGN KEY (car_id)
		REFERENCES cars (id)
		ON DELETE SET NULL
		ON UPDATE SET NULL;
		`); */
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('cars_image');

		/* await queryRunner.query(`
		DROP TABLE cars_image;
		`); */
	}
}
