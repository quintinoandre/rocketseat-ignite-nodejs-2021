import { Expose } from 'class-transformer';
import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

const {
	env: { DISK, APP_API_URL, AWS_BUCKET_URL },
} = process;

@Entity('users')
class User {
	@PrimaryColumn()
	id: string;

	@Column()
	name: string;

	@Column()
	password: string;

	@Column()
	email: string;

	@Column()
	driver_license: string;

	@Column()
	is_admin: boolean;

	@Column()
	avatar: string;

	@CreateDateColumn()
	created_at: Date;

	@Expose({ name: 'avatar_url' })
	avatar_url(): string {
		switch (DISK) {
			case 'LOCAL':
				return `${APP_API_URL}/avatar/${this.avatar}`;
			case 'S3':
				return `${AWS_BUCKET_URL}/avatar/${this.avatar}`;
			default:
				return null;
		}
	}

	constructor() {
		if (!this.id) this.id = uuidV4();
	}
}

export { User };
