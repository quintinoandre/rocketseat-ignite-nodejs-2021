import { MigrationInterface, QueryRunner, Table } from 'typeorm';

class CreateCategories1653523397850 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'categories',
				columns: [
					{ name: 'id', type: 'uuid', isPrimary: true },
					{ name: 'name', type: 'varchar' },
					{ name: 'description', type: 'varchar' },
					{ name: 'created_at', type: 'timestamp', default: 'now()' },
				],
			})
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('categories');
	}
}

export { CreateCategories1653523397850 };
