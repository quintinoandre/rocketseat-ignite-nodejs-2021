import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

(async function main() {
  const result = await prisma.courses.create({
    data: {
      duration: 300,
      name: 'React Native Course',
      description: 'Excellent React Native Course with Rodrigão',
    },
  });

  console.log('🚀 ~ file: create.ts ~ line 13 ~ main ~ result', result);
})();
