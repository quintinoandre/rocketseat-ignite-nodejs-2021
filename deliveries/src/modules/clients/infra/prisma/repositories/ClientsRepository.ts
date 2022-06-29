import { inject, injectable } from 'tsyringe';

import { PrismaClient } from '@prisma/client';

import { ICreateClientDTO, IFindAllDeliveriesDTO } from '../../../dtos';
import { IClientsRepository } from '../../../repositories';
import { IClient } from '../entities';

@injectable()
class ClientsRepository implements IClientsRepository {
	constructor(
		@inject('Prisma')
		private prisma: PrismaClient
	) {}

	async create({ username, password }: ICreateClientDTO): Promise<IClient> {
		const client = await this.prisma.clients.create({
			data: { username, password },
		});

		return client;
	}

	async findByUsername(username: string): Promise<IClient | null> {
		const client = await this.prisma.clients.findFirst({
			where: { username: { equals: username, mode: 'insensitive' } },
		});

		return client;
	}

	async findAllDeliveries({
		id_client,
	}: IFindAllDeliveriesDTO): Promise<IClient> {
		const client = (await this.prisma.clients.findFirst({
			where: { id: id_client },
			include: { deliveries: true },
		})) as IClient;

		return client;
	}
}

export { ClientsRepository };
