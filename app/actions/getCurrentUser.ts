import { db } from "@/lib/db" // Importing the database instance from the specified path
import { currentUser } from "@clerk/nextjs/server" // Importing the currentUser function from Clerk's Next.js package
import { User as ClerkUser } from "@clerk/nextjs/server" // Importing the User type from Clerk's Next.js server package
import { User as PrismaUser } from "@prisma/client" // Importing the User type from Prisma client

import { NextResponse } from "next/server" // Importing NextResponse from Next.js server package

interface currentUser {
  currentUserPrisma: PrismaUser & {
    following: PrismaUser[] // Extending PrismaUser with a following array of PrismaUser type
  };
  currentUserClerk:ClerkUser
}

export const getCurrentUser = async (): Promise<currentUser> => {
  const currentUserClerk = await currentUser(); // Getting the current user from Clerk
  if (currentUserClerk === null) {
    throw new Error("unauthorised"); // Throwing an error if the current user is not found
  }
  const currentUserPrisma = await db.user.findUnique({
    where: {
      externalUserId: currentUserClerk.id // Finding the user in the database by externalUserId
    },
    include: {
      following: true, // Including the following field in the result
      followedBy: true, // Including the followedBy field in the result
    }
  })
  if (currentUserPrisma === null) {
    throw new Error('user not found'); // Throwing an error if the user is not found in the database
  }
  return { currentUserPrisma, currentUserClerk } // Returning the current user from both Prisma and Clerk
}
