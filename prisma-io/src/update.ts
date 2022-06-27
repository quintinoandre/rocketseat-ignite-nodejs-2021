import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

(async function main() {
  const result = await prisma.courses.update({
    where: { id: '1e0a81c0-5c3c-422a-84be-daf79d2cd630' },
    data: { duration: 300 },
  });

  console.log('🚀 ~ file: update.ts ~ line 10 ~ main ~ result', result);
})();
