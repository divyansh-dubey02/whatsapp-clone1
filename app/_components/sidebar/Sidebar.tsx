import DesktopSidebarHeader from "@/app/_components/sidebar/DesktopSidebarHeader";
import getConversations from "@/app/actions/getConversations";
import { getCurrentUser } from "@/app/actions/getCurrentUser";
import COnversationList from "@/app/conversation/_components/ConversationList";

async function Sidebar({ children }: { children: React.ReactNode }) {
  const { currentUserPrisma } = await getCurrentUser();
  const conversations = await getConversations();
  return (
    <div className="h-full w-screen flex">
      <aside className="h-full min-w-[300px] bg-zinc-400">
        <DesktopSidebarHeader />
        <COnversationList/>
      </aside>
      <main>{children}</main>
    </div>
  );
}
export default Sidebar;
