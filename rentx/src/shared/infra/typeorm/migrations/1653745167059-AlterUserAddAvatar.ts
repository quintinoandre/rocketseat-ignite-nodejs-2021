import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

class AlterUserAddAvatar1653745167059 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.addColumn(
			'users',
			new TableColumn({ name: 'avatar', type: 'varchar', isNullable: true })
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropColumn('users', 'avatar');
	}
}

export { AlterUserAddAvatar1653745167059 };
