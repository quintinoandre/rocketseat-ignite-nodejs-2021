import { getRepository, Repository } from 'typeorm';

import { ICreateSpecificationDTO } from '@modules/cars/dtos';
import { Specification } from '@modules/cars/infra/typeorm/entities';
import { ISpecificationsRepository } from '@modules/cars/repositories';

class SpecificationsRepository implements ISpecificationsRepository {
	constructor(
		private repository: Repository<Specification> = getRepository(Specification)
	) {}

	async create(data: ICreateSpecificationDTO): Promise<void> {
		const specification = this.repository.create(data);

		await this.repository.save(specification);

		/* const id = uuidV4();

		const { name, description } = data;

		await this.repository.query(`
		INSERT INTO specifications
		(id, name, description)
		VALUES
		('${id}', '${name}', '${description}');
		`); */
	}

	async findByName(name: string): Promise<Specification> {
		const specification = await this.repository.findOne({ name });

		return specification;

		/* const specification = await this.repository.query(`
		SELECT * FROM specifications WHERE name = '${name}';
		`);

		return specification; */
	}
}

export { SpecificationsRepository };
