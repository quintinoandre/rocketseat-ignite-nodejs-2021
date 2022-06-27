import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

(async function main() {
  const result = await prisma.courses.create({
    data: {
      name: 'JavaScript Course',
      duration: 500,
      description: 'JavaScript Course',
      teacher: {
        connectOrCreate: {
          where: {
            name: 'Daniele Leão Evangelista',
          },
          create: {
            name: 'Daniele Leão Evangelista',
          },
        },
      },
    },
  });

  console.log('🚀 ~ file: create.ts ~ line 23 ~ main ~ result', result);
})();
