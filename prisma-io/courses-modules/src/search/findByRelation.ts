import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

(async function main() {
  const result = await prisma.coursesModules.findMany({
    include: { course: true, module: true },
  });

  console.log('🚀 ~ file: findByRelation.ts ~ line 12 ~ main ~ result', result);
})();
