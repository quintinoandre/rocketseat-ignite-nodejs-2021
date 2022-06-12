import { MigrationInterface, QueryRunner, Table } from 'typeorm';

class CreateUsersToken1655059090907 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'users_tokens',
				columns: [
					{ name: 'id', type: 'uuid', isPrimary: true },
					{ name: 'refresh_token', type: 'varchar' },
					{ name: 'user_id', type: 'uuid' },
					{ name: 'expires_date', type: 'timestamp' },
					{ name: 'created_at', type: 'timestamp', default: 'now()' },
				],
				foreignKeys: [
					{
						name: 'FKUserToken',
						referencedTableName: 'users',
						referencedColumnNames: ['id'],
						columnNames: ['user_id'],
						onDelete: 'CASCADE',
						onUpdate: 'CASCADE',
					},
				],
			})
		);

		/* await queryRunner.query(`
			CREATE TABLE users_tokens (
				id uuid PRIMARY KEY,
				refresh_token varchar NOT NULL,
				user_id uuid NOT NULL,
				expires_date timestamp NOT NULL,
				created_at timestamp DEFAULT now() NOT NULL,
				CONSTRAINT FKUserToken
				FOREIGN KEY (user_id)
				REFERENCES users (id)
				ON DELETE CASCADE
				ON UPDATE CASCADE;
			)
		`); */
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('users_tokens');

		/* await queryRunner.query(`
			DROP TABLE users_tokens;
		`); */
	}
}

export { CreateUsersToken1655059090907 };
