import type { Metadata } from "next";
import "../styles/globals.css";
import { ThemeProvider } from "@/providers/ThemeProvider";
import Header from "@/components/Header";
import { getUser } from "@/auth/server";
import { Toaster } from "react-hot-toast";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Note } from "@prisma/client";
import { prisma } from "@/db/prisma";
import NoteProvider from "@/providers/NoteProvider";

export const metadata: Metadata = {
  title: "Cogniscribe",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser();
  let notes: Note[] = [];
  if (user) {
    notes = await prisma.note.findMany({
      where: {
        authorId: user.id,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });
  }
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NoteProvider>
            <SidebarProvider>
              <AppSidebar user={user} notes={notes} />
              <div className="flex min-h-screen flex-col bg-background">
                <Header user={user} />
                <main className="flex flex-1 flex-col px-4 pt-10 xl:px-8">
                  {children}
                </main>
              </div>
            </SidebarProvider>
            <Toaster />
          </NoteProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
