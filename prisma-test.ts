import { prisma } from './lib/prisma';
import "dotenv/config";

async function main() {
  try {
    const count = await prisma.brief.count();
    console.log(`Connection successful. Current brief count: ${count}`);
  } catch (error) {
    console.error('Prisma connection test failed:');
    console.error(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
