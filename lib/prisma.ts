// import { PrismaClient } from "@/app/generated/prisma/client";

// const globalForPrisma = global as unknown as { prisma: PrismaClient };

// export const prisma =
//   globalForPrisma.prisma ||
//   new PrismaClient({
//     adapter: "direct", 
//   });

// if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// lib/prisma.ts
// import { PrismaClient } from "@/app/generated/prisma/client";

// // Prevent multiple instances during dev (Next.js hot reload)
// const globalForPrisma = global as unknown as { prisma?: PrismaClient };

// export const prisma =
//   globalForPrisma.prisma ||
//   new PrismaClient({
//     adapter: "direct"
//   }); // ✅ just an empty constructor

// if (process.env.NODE_ENV !== "production") {
//   globalForPrisma.prisma = prisma;
// }



// import { PrismaClient } from "@/app/generated/prisma/client";

// const globalForPrisma = global as unknown as { prisma?: PrismaClient };

// export const prisma =
//   globalForPrisma.prisma ?? new PrismaClient();

// if (process.env.NODE_ENV !== "production") {
//   globalForPrisma.prisma = prisma;
// }



import { PrismaClient } from "@/app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const globalForPrisma = global as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter: new PrismaPg(new Pool({
      connectionString: process.env.DATABASE_URL,
    })),
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}