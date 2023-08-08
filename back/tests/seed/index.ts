import { PrismaClient } from '@prisma/client'
import { seedAll } from './all';

const prisma = new PrismaClient();

async function main() {
  const result = await seedAll(prisma);

  return result;
}

main()
  .then(async (result) => {
    console.log("############### SEED COMPLETED ###############");

    console.log(result);
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })