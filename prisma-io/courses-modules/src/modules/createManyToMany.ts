import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

(async function main() {
  const result = await prisma.coursesModules.create({
    data: {
      fk_id_course: 'c188431b-945d-4b11-974a-9a616e32a0c0',
      fk_id_module: 'bb1e0ba0-69dc-45ff-a882-076d09fd273e',
    },
  });

  console.log(
    '🚀 ~ file: createManyToMany.ts ~ line 12 ~ main ~ result',
    result
  );
})();
