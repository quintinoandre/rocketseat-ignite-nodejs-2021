import { getRepository, Repository } from 'typeorm';

import { ICreateSpecificationDTO } from '@modules/cars/dtos';
import { Specification } from '@modules/cars/infra/typeorm/entities';
import { ISpecificationsRepository } from '@modules/cars/repositories';

class SpecificationsRepository implements ISpecificationsRepository {
	constructor(
		private repository: Repository<Specification> = getRepository(Specification)
	) {}

	async create(data: ICreateSpecificationDTO): Promise<Specification> {
		const specification = this.repository.create(data);

		const result = await this.repository.save(specification);

		return result;

		/* const id = uuidV4();

		const { name, description } = data;

		const [specification] = await this.repository.query(`
		INSERT INTO specifications
		(id, name, description)
		VALUES
		('${id}', '${name}', '${description}');
		`) RETURNING *;

		return specification; */
	}

	async findByName(name: string): Promise<Specification> {
		const specification = await this.repository.findOne({ name });

		return specification;

		/* const specification = await this.repository.query(`
		SELECT * FROM specifications WHERE name = '${name}';
		`);

		return specification; */
	}

	async findByIds(ids: string[]): Promise<Specification[]> {
		const specifications = await this.repository.findByIds(ids);

		return specifications;

		/* const specifications = await this.repository.query(`
		SELECT * FROM specifications WHERE id IN (${ids.join(', ')});
		`);

		return specifications; */
	}
}

export { SpecificationsRepository };
