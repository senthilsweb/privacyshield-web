import React from 'react';
import Link from 'next/link';
import { Icons } from "@/components/icons";
import { siteConfig } from '@/config/site';

const PageFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t bg-background">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between">
          <p className="text-sm text-muted-foreground">
            © {currentYear} {siteConfig.authors[0].name}. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="https://github.com/senthilsweb"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="GitHub"
            >
              <Icons.gitHub className="h-5 w-5" />
            </Link>
            <Link
              href="https://www.linkedin.com/in/senthilsweb/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="LinkedIn"
            >
              <Icons.linkedin className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default PageFooter;