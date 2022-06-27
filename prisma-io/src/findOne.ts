import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

(async function main() {
  // SELECT * FROM courses LIMIT 1
  const firstCourse = await prisma.courses.findFirst();

  console.log('🚀 ~ file: findOne.ts ~ line 7 ~ main ~ course', firstCourse);

  // SELECT * FROM courses ORDER BY id DESC LIMIT 1
  const lastCourse = await prisma.courses.findFirst({ take: -1 });

  console.log(
    '🚀 ~ file: findOne.ts ~ line 13 ~ main ~ lastCourse',
    lastCourse
  );
})();
