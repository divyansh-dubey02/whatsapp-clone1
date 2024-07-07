import { PrismaClient } from "@prisma/client"; // Importing PrismaClient from Prisma

declare global {
  var prisma: PrismaClient | undefined; // Declaring a global variable 'prisma' of type PrismaClient or undefined
}

export const db = globalThis.prisma || new PrismaClient(); // Using the existing global 'prisma' instance or creating a new PrismaClient instance

if (process.env.NODE_ENV !== "production") globalThis.prisma = db; // In non-production environments, assign the PrismaClient instance to the global 'prisma' variable
