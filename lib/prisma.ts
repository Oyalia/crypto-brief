import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import "dotenv/config";

const globalForPrisma = global as unknown as { 
  prisma2?: PrismaClient,
  pool2?: Pool 
};

const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_PRISMA_URL;

if (!connectionString) {
  console.error("CRITICAL: DATABASE_URL is undefined in the server context!");
}

const pool = globalForPrisma.pool2 || new Pool({ connectionString });
const adapter = new PrismaPg(pool);

export const prisma = globalForPrisma.prisma2 || new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma2 = prisma;
  globalForPrisma.pool2 = pool;
}
