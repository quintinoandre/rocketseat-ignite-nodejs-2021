import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

(async function main() {
  const result = await prisma.courses.findMany({
    include: { modules: true },
  });

  console.log(
    '🚀 ~ file: findByCourse.ts ~ line 10 ~ main ~ result',
    JSON.stringify(result)
  );
})();
