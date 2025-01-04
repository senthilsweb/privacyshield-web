import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/mode-toggle";
import MainNav from "@/components/main-nav";
import { Separator } from "@/components/ui/separator";
import { ColorTheme } from "@/components/color-theme";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Privacy Shield - Data Anonymizer",
  description:
    "Anonymize and transform your text with advanced AI capabilities",
};

export const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider>
            <div className="flex min-h-screen">
              <AppSidebar />
              <SidebarInset>
                <div className="flex-1 flex flex-col">
                  <div className="flex items-center h-16 border-b px-4">
                    <SidebarTrigger className="mr-4" />
                    <Separator orientation="vertical" className="mr-2 h-4" />
                    <MainNav />
                    <div className="space-x-2">
                      <ColorTheme />
                      <ModeToggle />
                    </div>
                  </div>
                  <main className="flex flex-1">{children}</main>
                </div>
              </SidebarInset>
            </div>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
