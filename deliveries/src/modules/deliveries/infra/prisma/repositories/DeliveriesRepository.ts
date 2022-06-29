import { inject, injectable } from 'tsyringe';

import { PrismaClient } from '@prisma/client';

import { ICreateDeliveryDTO, IUpdateDeliverymanDTO } from '../../../dtos';
import { IDeliveriesRepository } from '../../../repositories';
import { IDelivery } from '../entities';

@injectable()
class DeliveriesRepository implements IDeliveriesRepository {
	constructor(
		@inject('Prisma')
		private prisma: PrismaClient
	) {}

	async create({
		item_name,
		id_client,
	}: ICreateDeliveryDTO): Promise<IDelivery> {
		const delivery = await this.prisma.deliveries.create({
			data: { item_name, id_client },
		});

		return delivery;
	}

	async findAllAvailable(): Promise<IDelivery[]> {
		const deliveries = await this.prisma.deliveries.findMany({
			where: { end_at: null, id_deliveryman: null },
		});

		return deliveries;
	}

	async updateDeliveryman({
		id_delivery,
		id_deliveryman,
	}: IUpdateDeliverymanDTO): Promise<IDelivery> {
		const delivery = await this.prisma.deliveries.update({
			where: { id: id_delivery },
			data: { id_deliveryman },
		});

		return delivery;
	}

	async updateEndDate({
		id_delivery,
		id_deliveryman,
	}: IUpdateDeliverymanDTO): Promise<IDelivery> {
		await this.prisma.deliveries.updateMany({
			where: { id: id_delivery, id_deliveryman },
			data: { end_at: new Date() },
		});

		const delivery = (await this.prisma.deliveries.findUnique({
			where: { id: id_delivery },
		})) as IDelivery;

		return delivery;
	}
}

export { DeliveriesRepository };
