import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

(async function main() {
  const result = await prisma.courses.create({
    data: {
      name: 'Elixir Course',
      duration: 200,
      description: 'Elixir Course',
      teacher: {
        create: {
          name: 'Rafa Camarda',
        },
      },
    },
  });

  console.log('🚀 ~ file: create.ts ~ line 23 ~ main ~ result', result);
})();
