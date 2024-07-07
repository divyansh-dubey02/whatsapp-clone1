import { db } from "@/lib/db" // Importing the database instance from the specified path
import { getCurrentUser } from "./getCurrentUser" // Importing the getCurrentUser function from the specified path

const getConversations = async () => {
  const { currentUserPrisma } = await getCurrentUser(); // Getting the current user from the getCurrentUser function

  if (!currentUserPrisma.id) return []; // If the current user's ID is not found, return an empty array

  try {
    const conversations = await db.conversation.findMany({
      orderBy: {
        lastMessageAt: 'desc' // Ordering conversations by the last message time in descending order
      },
      where: {
        userIds: {
          has: currentUserPrisma.id // Finding conversations that include the current user's ID
        }
      },
      include: {
        users: true, // Including the users in the conversation
        messages: {
          include: {
            sender: true, // Including the sender of each message
            seen: true // Including the users who have seen each message
          }
        }
      }
    });
    return conversations; // Returning the found conversations
  } catch (error: any) {
    console.log(error); // Logging any errors that occur
    return []; // Returning an empty array in case of an error
  }
}

export default getConversations; // Exporting the getConversations function as the default export
