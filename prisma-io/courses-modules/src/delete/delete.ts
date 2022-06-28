import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

(async function main() {
  const result = await prisma.coursesModules.delete({
    where: { id: 'd8d7f996-8362-452c-93d6-94eceeef79d3' },
  });

  console.log('🚀 ~ file: delete.ts ~ line 9 ~ main ~ result', result);
})();
