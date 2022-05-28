import { ICreateSpecificationDTO } from '../dtos';
import { Specification } from '../entities';

interface ISpecificationsRepository {
	create(data: ICreateSpecificationDTO): Promise<void>;
	findByName(name: string): Promise<Specification>;
}

export type { ISpecificationsRepository };
