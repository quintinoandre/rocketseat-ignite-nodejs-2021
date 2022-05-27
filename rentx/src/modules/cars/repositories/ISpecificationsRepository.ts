import { ICreateSpecificationDTO } from '../dtos';
import { Specification } from '../entities';

interface ISpecificationsRepository {
	create({ name, description }: ICreateSpecificationDTO): Promise<void>;
	findByName(name: string): Promise<Specification>;
}

export type { ISpecificationsRepository };
