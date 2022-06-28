import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

(async function main() {
  let skip = 0;
  let exist = true;

  while (exist) {
    const result = await prisma.courses.findMany({ skip, take: 1 });

    skip += 1;

    if (result.length <= 0) exist = false;

    console.log('🚀 ~ file: pagination.ts ~ line 11 ~ main ~ result', result);
  }
})();
