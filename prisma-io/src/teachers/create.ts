import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

(async function main() {
  const result = await prisma.teachers.create({
    data: {
      name: 'Diego Fernandes',
    },
  });

  console.log('🚀 ~ file: create.ts ~ line 11 ~ main ~ result', result);
})();
