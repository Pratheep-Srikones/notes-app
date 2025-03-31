import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import { Note } from "@prisma/client";
import Link from "next/link";
import SidebarGroupContent from "./SidebarGroupContent";

export function AppSidebar({ user, notes }: { user: unknown; notes: Note[] }) {
  return (
    <Sidebar className="mt-16">
      <SidebarContent className="custom-scrollbar">
        <SidebarGroup>
          <SidebarGroupLabel className="my-2 text-lg">
            {user ? (
              "Your Notes"
            ) : (
              <p>
                <Link href={"/login"} className="underline">
                  Login
                </Link>
                to see your notes
              </p>
            )}
          </SidebarGroupLabel>
          {typeof user === "object" && user !== null && (
            <SidebarGroupContent notes={notes} />
          )}
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
