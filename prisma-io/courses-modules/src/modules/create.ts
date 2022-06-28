import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

(async function main() {
  const result = await prisma.modules.create({
    data: {
      description: 'Learning firebase from scratch',
      name: 'Learning firebase',
      courses: {
        create: {
          course: {
            connect: {
              id: 'c188431b-945d-4b11-974a-9a616e32a0c0',
            },
          },
        },
      },
    },
  });

  console.log('🚀 ~ file: create.ts ~ line 15 ~ main ~ result', result);
})();
