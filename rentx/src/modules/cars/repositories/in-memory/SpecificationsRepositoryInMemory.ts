import { ICreateSpecificationDTO } from '@modules/cars/dtos';
import { Specification } from '@modules/cars/infra/typeorm/entities';

import { ISpecificationsRepository } from '../ISpecificationsRepository';

class SpecificationsRepositoryInMemory implements ISpecificationsRepository {
	private specifications: Array<Specification> = [];

	async create(data: ICreateSpecificationDTO): Promise<Specification> {
		const specification = new Specification();

		Object.assign(specification, data);

		this.specifications.push(specification);

		return specification;
	}

	async findByName(name: string): Promise<Specification> {
		return this.specifications.find(
			(specification) => specification.name === name
		);
	}

	async findByIds(ids: Array<string>): Promise<Specification[]> {
		return this.specifications.filter((specification) =>
			ids.includes(specification.id)
		);
	}
}

export { SpecificationsRepositoryInMemory };
