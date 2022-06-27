import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

(async function main() {
  const result = await prisma.courses.findMany({
    include: { teacher: true },
  });

  console.log('🚀 ~ file: findRelation.ts ~ line 9 ~ main ~ result', result);
})();
