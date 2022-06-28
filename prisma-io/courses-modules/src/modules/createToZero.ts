import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

(async function main() {
  const result = await prisma.coursesModules.create({
    data: {
      course: {
        create: {
          duration: 200,
          name: 'NodeJS Course',
          description: 'Complete NodeJS Course',
        },
      },
      module: {
        create: {
          description: 'Complete PrismaIO Course',
          name: 'PrismaIO',
        },
      },
    },
  });

  console.log('🚀 ~ file: createToZero.ts ~ line 23 ~ main ~ result', result);
})();
