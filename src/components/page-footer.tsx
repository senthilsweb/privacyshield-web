import React from 'react';
import Link from 'next/link';
import { Icons } from "@/components/icons";
import { siteConfig } from '@/config/site';

const PageFooter = () => {
  const currentYear = new Date().getFullYear();
  const socialLinks = siteConfig.footer.menuItems.find(
    item => item.trigger === "Contact"
  )?.content.items || [];

  return (
    <footer className="w-full bg-primary/80 dark:bg-primary/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl py-12 lg:py-16">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 gap-8 xl:grid-cols-3 xl:gap-12">
            {/* Dynamically render first two sections */}
            {siteConfig.footer.menuItems
              .filter(section => section.trigger !== "Contact")
              .map((section) => (
                <div key={section.trigger} className="space-y-4">
                  <h3 className="text-base font-semibold uppercase tracking-wide text-primary-foreground">
                    {section.trigger}
                  </h3>
                  <ul className="space-y-3">
                    {section.content.items.map((item) => (
                      <li key={item.title}>
                        <Link
                          href={item.href}
                          className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                        >
                          {item.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
            ))}

            {/* Contact Section */}
            <div className="space-y-4">
              <h3 className="text-base font-semibold uppercase tracking-wide text-primary-foreground">
                Contact
              </h3>
              <div className="rounded-lg bg-primary/90 dark:bg-primary/10 p-6">
                <h4 className="font-medium text-primary-foreground mb-2">
                  {siteConfig.authors[0].name}
                </h4>
                <a 
                  href={`mailto:${siteConfig.authors[0].email}`}
                  className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors flex items-center gap-2"
                >
                  <Icons.mail className="h-4 w-4" />
                  {siteConfig.authors[0].email}
                </a>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="mx-auto max-w-5xl">
            <div className="h-px bg-primary-foreground/10 my-12" />

            {/* Bottom Bar */}
            <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-4">
              {/* Copyright */}
              <div className="text-sm text-primary-foreground">
                © {currentYear} {siteConfig.name}. All rights reserved.
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-6">
                {socialLinks.map((item) => {
                  const Icon = Icons[item.icon as keyof typeof Icons];
                  return (
                    <Link
                      key={item.title}
                      href={item.href}
                      className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                    >
                      {Icon && <Icon className="h-5 w-5" />}
                      <span className="sr-only">{item.title}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default PageFooter;