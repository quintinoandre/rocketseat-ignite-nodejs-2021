import { container } from 'tsyringe';

import { PrismaClient } from '@prisma/client';

import { ClientsRepository } from '../../modules/clients/infra/prisma/repositories';
import { IClientsRepository } from '../../modules/clients/repositories';

container.registerInstance('Prisma', new PrismaClient());

container.registerSingleton<IClientsRepository>(
	'ClientsRepository',
	ClientsRepository
);
