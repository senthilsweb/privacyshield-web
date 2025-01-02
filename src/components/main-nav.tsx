import React from 'react';
import { Icons } from "@/components/icons";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";

const navigationData = {
  menuItems: [
    {
      trigger: "Getting Started",
      content: {
        featured: {
          icon: "logo",
          title: "Text Anonymization",
          description:
            "Anonymize and transform your text with advanced AI capabilities",
          href: "/",
        },
        items: [
          {
            title: "Introduction",
            href: "/docs",
            description: "Getting started with text anonymization",
          },
          {
            title: "Installation",
            href: "/installation",
            description: "How to setup and configure the application",
          },
          {
            title: "Usage Guide",
            href: "/usage",
            description: "Learn how to use the features effectively",
          },
        ],
      },
    },
    {
      trigger: "Features",
      content: {
        items: [
          {
            title: "PII Detection",
            href: "#",
            description:
              "Identify and detect personally identifiable information in text",
          },
          {
            title: "Text Transformation",
            href: "#",
            description: "Transform anonymized text into different formats",
          },
        ],
      },
    },
    {
      trigger: "Resources",
      content: {
        items: [
          {
            title: "PII Detection",
            href: "#",
            description:
              "Identify and detect personally identifiable information in text",
          },
          {
            title: "Text Transformation",
            href: "#",
            description: "Transform anonymized text into different formats",
          },
        ],
      },
    },
    {
      trigger: "Documentation",
      href: "#",
    },
  ],
};

const MainNav = () => {
  const renderIcon = (iconName: keyof typeof Icons) => {
    const IconComponent = Icons[iconName];
    return IconComponent ? <IconComponent className="h-6 w-6" /> : null;
  };

  
    return (
      <div className="flex-1 flex justify-center items-center">
        <NavigationMenu>
          <NavigationMenuList>
            {navigationData.menuItems.map((menuItem, index) => (
              <NavigationMenuItem key={index}>
                {menuItem.content ? (
                  <>
                    <NavigationMenuTrigger className="text-sm font-normal">
                      {menuItem.trigger}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className={`grid gap-3 p-4 md:w-[400px] lg:w-[500px] ${
                        menuItem.content.featured ? 'lg:grid-cols-[.75fr_1fr]' : 'md:grid-cols-2'
                      }`}>
                        {menuItem.content.featured && (
                          <li className="row-span-3">
                            <NavigationMenuLink asChild>
                              <a className="flex h-full w-full flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md" 
                                 href={menuItem.content.featured.href}>
                                {renderIcon(menuItem.content.featured.icon as keyof typeof Icons)}
                                <div className="mb-2 mt-4 text-lg font-medium">
                                  {menuItem.content.featured.title}
                                </div>
                                <p className="text-sm leading-tight text-muted-foreground">
                                  {menuItem.content.featured.description}
                                </p>
                              </a>
                            </NavigationMenuLink>
                          </li>
                        )}
                        {menuItem.content.items.map((item) => (
                          <li key={item.title}>
                            <NavigationMenuLink asChild>
                              <a className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground" 
                                 href={item.href}>
                                <div className="text-sm font-medium leading-none">{item.title}</div>
                                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                  {item.description}
                                </p>
                              </a>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </>
                ) : (
                  <Link href={menuItem.href} legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      {menuItem.trigger}
                    </NavigationMenuLink>
                  </Link>
                )}
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    );
  };
  
  export default MainNav;
