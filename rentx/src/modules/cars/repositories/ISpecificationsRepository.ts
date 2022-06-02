import { ICreateSpecificationDTO } from '@modules/cars/dtos';
import { Specification } from '@modules/cars/infra/typeorm/entities';

interface ISpecificationsRepository {
	create(data: ICreateSpecificationDTO): Promise<Specification>;
	findByName(name: string): Promise<Specification>;
	findByIds(ids: Array<string>): Promise<Specification[]>;
}

export type { ISpecificationsRepository };
