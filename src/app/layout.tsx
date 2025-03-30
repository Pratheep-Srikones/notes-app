import type { Metadata } from "next";
import "./styles/globals.css";
import Provider from "./_trpc/Provider";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Cogniscribe",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Provider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="flex min-h-screen flex-col bg-background">
              <Header />
              <main className="flex flex-1 flex-col px-4 pt-10 xl:px-8">
                {children}
              </main>
            </div>
            <Toaster />
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  );
}
