import { useParams } from "next/navigation"; // Importing the useParams hook from Next.js navigation
import { useMemo } from "react"; // Importing useMemo hook from React

const useConversation = () => {
  const Params = useParams(); // Getting the current route parameters using useParams

  const ConversationId = useMemo(() => {
    if (!Params?.ConversationId) {
      return ''; // Returning an empty string if ConversationId is not present in Params
    }

    return Params.ConversationId as string; // Casting and returning ConversationId as a string
  }, [Params?.ConversationId]); // Dependency array includes Params.ConversationId to recalculate value if it changes

  const isOpen = useMemo(() => !!ConversationId, [ConversationId]); // Checking if ConversationId is not empty and setting isOpen accordingly

  return useMemo(() => ({
    isOpen, // Returning isOpen status
    ConversationId // Returning ConversationId
  }), [isOpen, ConversationId]); // Dependency array includes isOpen and ConversationId to recalculate the return object if they change
}

export default useConversation; // Exporting the useConversation hook as the default export
