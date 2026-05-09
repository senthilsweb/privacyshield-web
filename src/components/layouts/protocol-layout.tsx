import React from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/mode-toggle";
import TopNav from "@/components/top-nav";
import { ColorTheme } from "@/components/color-theme";
import BrandLogoProtocol from "@/components/brand-logo-protocol";
import PageFooter from "@/components/page-footer";

interface ProtocolLayoutProps {
  children: React.ReactNode;
}

export const ProtocolLayout = ({ children }: ProtocolLayoutProps) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <div className="min-h-screen bg-background flex flex-col">
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex h-14 items-center px-4 w-full">
            <div className="mr-4 flex-shrink-0">
              <BrandLogoProtocol className="hidden md:flex" />
              <BrandLogoProtocol variant="mobile" className="md:hidden" />
            </div>

            <TopNav />

            <div className="flex items-center gap-1 ml-4">
              <ColorTheme />
              <ModeToggle />
            </div>
          </div>
        </header>

        <main className="flex-1">{children}</main>
        <PageFooter />
      </div>
    </ThemeProvider>
  );
};
