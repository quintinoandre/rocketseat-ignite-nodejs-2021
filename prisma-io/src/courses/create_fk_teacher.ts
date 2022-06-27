import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

(async function main() {
  const result = await prisma.courses.create({
    data: {
      name: 'ReactJS Course',
      duration: 300,
      description: 'ReactJS Course',
      fk_id_teacher: '3106ffe1-b9a3-4ec9-b1cd-20dcbb057f40',
    },
  });

  console.log('🚀 ~ file: create.ts ~ line 23 ~ main ~ result', result);
})();
