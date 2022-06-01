import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

class AlterUserAddAvatar1653745167059 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.addColumn(
			'users',
			new TableColumn({ name: 'avatar', type: 'varchar', isNullable: true })
		);

		/* await queryRunner.query(`
		ALTER TABLE users
		ADD COLUMN avatar varchar;
		`); */
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropColumn('users', 'avatar');

		/* await queryRunner.query(`
		ALTER TABLE users
		DROP COLUMN avatar;
		`); */
	}
}

export { AlterUserAddAvatar1653745167059 };
