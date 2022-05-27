import { getRepository, Repository } from 'typeorm';

import { ICreateSpecificationDTO } from '../../dtos';
import { Specification } from '../../entities';
import { ISpecificationsRepository } from '../ISpecificationsRepository';

class SpecificationsRepository implements ISpecificationsRepository {
	constructor(
		private repository: Repository<Specification> = getRepository(Specification)
	) {}

	async create({ name, description }: ICreateSpecificationDTO): Promise<void> {
		const specification = this.repository.create({ name, description });

		await this.repository.save(specification);
	}

	async findByName(name: string): Promise<Specification> {
		const specification = await this.repository.findOne({ name });

		return specification;
	}
}

export { SpecificationsRepository };
