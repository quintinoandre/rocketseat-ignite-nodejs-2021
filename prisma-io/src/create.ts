import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

(async function main() {
  const result = await prisma.courses.create({
    data: {
      duration: 200,
      name: 'NodeJS Course',
      description: 'Excellent NodeJS Course',
    },
  });

  console.log('🚀 ~ file: server.ts ~ line 13 ~ main ~ result', result);
})();
