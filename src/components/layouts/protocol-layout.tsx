import React from 'react';
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/mode-toggle";
import MainNav from "@/components/main-nav";
import { ColorTheme } from "@/components/color-theme";
import BrandLogoProtocol from "@/components/brand-logo-protocol";

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
      <div className="min-h-screen bg-background">
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex h-14 items-center px-4 w-full">
            <div className="mr-4">
              <BrandLogoProtocol className="hidden md:flex" />
              <BrandLogoProtocol variant="mobile" className="md:hidden" />
            </div>

            <div className="flex flex-1 items-center justify-between space-x-2">
              <MainNav />
              
              <div className="flex items-center space-x-4">
                <div className="hidden md:block">
                  <div className="relative">
                    <input
                      type="search"
                      placeholder="Search documentation..."
                      className="h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring md:w-[200px] lg:w-[300px]"
                    />
                  </div>
                </div>
                <nav className="flex items-center space-x-2">
                  <ColorTheme />
                  <ModeToggle />
                </nav>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1">
          {children}
        </main>
      </div>
    </ThemeProvider>
  );
};