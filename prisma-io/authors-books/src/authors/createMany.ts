import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

(async function main() {
  const result = await prisma.authors.create({
    data: {
      name: 'Mayk Brito',
      books: {
        createMany: {
          data: [
            { name: 'How to start programming' },
            { name: 'How to be very productive' },
          ],
        },
      },
    },
  });

  console.log('🚀 ~ file: createMany.ts ~ line 19 ~ main ~ result', result);
})();
