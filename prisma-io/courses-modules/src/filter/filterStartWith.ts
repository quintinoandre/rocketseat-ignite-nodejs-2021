import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

(async function main() {
  const result = await prisma.courses.findMany({
    where: { name: { startsWith: 'react', mode: 'insensitive' } },
  });

  console.log('🚀 ~ file: filterStartWith.ts ~ line 9 ~ main ~ result', result);
})();
