import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

(async function main() {
  const result = await prisma.courses.findMany({
    where: {
      OR: [
        { name: { contains: 'NodeJS' } },
        { name: { contains: 'React Native' } },
      ],
      AND: { duration: 300 },
    },
  });

  console.log('🚀 ~ file: filterOr.ts ~ line 14 ~ main ~ result', result);
})();
