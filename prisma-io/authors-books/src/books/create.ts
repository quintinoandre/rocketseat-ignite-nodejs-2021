import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

(async function main() {
  const result = await prisma.books.create({
    data: {
      name: 'Clean architecture',
      author_id: 'e4cf868a-7ac3-4dbd-9e65-2bdf60f1d0b5',
    },
  });

  console.log('🚀 ~ file: create.ts ~ line 12 ~ main ~ result', result);
})();
