import { Specification } from '../../entities';
import {
	ICreateSpecificationDTO,
	ISpecificationsRepository,
} from '../ISpecificationsRepository';

class SpecificationsRepository implements ISpecificationsRepository {
	constructor(private specifications: Array<Specification> = []) {}

	create({ name, description }: ICreateSpecificationDTO): void {
		const specification = new Specification();

		Object.assign(specification, {
			name,
			description,
			created_at: new Date(),
		});

		this.specifications.push(specification);
	}

	findByName(name: string): Specification {
		const specification = this.specifications.find(
			(item) => item.name === name
		);

		return specification;
	}
}

export { SpecificationsRepository };
