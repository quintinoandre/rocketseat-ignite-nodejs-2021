import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

(async function main() {
  const result = await prisma.courses.create({
    data: {
      name: 'React Native Course',
      duration: 300,
      description: 'React Native Course',
      teacher: {
        connect: {
          id: '52ff257d-c43b-4a41-a6ba-2096829a03c5',
        },
      },
    },
  });

  console.log('🚀 ~ file: create.ts ~ line 23 ~ main ~ result', result);
})();
