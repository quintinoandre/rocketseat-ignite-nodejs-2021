import {
	MigrationInterface,
	QueryRunner,
	Table,
	TableForeignKey,
} from 'typeorm';

class CreateSpecificationsCars1654086160215 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'specifications_cars',
				columns: [
					{ name: 'car_id', type: 'uuid' },
					{ name: 'specification_id', type: 'uuid' },
					{ name: 'created_at', type: 'timestamp', default: 'now()' },
				],
			})
		);

		await queryRunner.createForeignKey(
			'specifications_cars',
			new TableForeignKey({
				name: 'FKSpecificationCar',
				referencedTableName: 'specifications',
				referencedColumnNames: ['id'],
				columnNames: ['specification_id'],
				onDelete: 'SET NULL',
				onUpdate: 'SET NULL',
			})
		);

		await queryRunner.createForeignKey(
			'specifications_cars',
			new TableForeignKey({
				name: 'FKCarSpecification',
				referencedTableName: 'cars',
				referencedColumnNames: ['id'],
				columnNames: ['car_id'],
				onDelete: 'SET NULL',
				onUpdate: 'SET NULL',
			})
		);

		/* await queryRunner.query(`
		CREATE TABLE specifications_cars (
			car_id uuid NOT NULL,
			specification_id uuid NOT NULL,
			created_at timestamp DEFAULT now() NOT NULL
		);
		`);

		await queryRunner.query(`
		ALTER TABLE specifications_cars
		ADD CONSTRAINT FKSpecificationCar
		FOREIGN KEY (specification_id)
		REFERENCES specifications (id)
		ON DELETE SET NULL
		ON UPDATE SET NULL;
		`);

		await queryRunner.query(`
		ALTER TABLE specifications_cars
		ADD CONSTRAINT FKCarSpecification
		FOREIGN KEY (car_id)
		REFERENCES cars (id)
		ON DELETE SET NULL
		ON UPDATE SET NULL;
		`); */
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropForeignKey(
			'specifications_cars',
			'FKCarSpecification'
		);

		await queryRunner.dropForeignKey(
			'specifications_cars',
			'FKSpecificationCar'
		);

		await queryRunner.dropTable('specifications_cars');

		/* await queryRunner.query(`
		ALTER TABLE specifications_cars
		DROP CONSTRAINT FKCarSpecification;
		`);

		await queryRunner.query(`
		ALTER TABLE specifications_cars
		DROP CONSTRAINT FKSpecificationCar;
		`);

		await queryRunner.query(`
		DROP TABLE specifications_cars;
		`); */
	}
}

export { CreateSpecificationsCars1654086160215 };
