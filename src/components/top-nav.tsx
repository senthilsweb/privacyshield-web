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

export const navigationData = {
  menuItems: [
    {
      trigger: "About Me",
      href: "https://www.senthilsweb.com/cms/senthilnathan-karuppaiah",
    },
    {
     trigger: "Blog",
      href: "/blog",
    },
    {
      trigger: "Projects",
      content: {
        featured: {
          icon: "logo",
          title: "Privacy Shield",
          description:
            "Anonymize and Transform text with advanced AI capabilities",
          href: "/anonymizer",
        },
        items: [
          {
            title: "TemplrJS",
            href: "https://github.com/senthilsweb/templrjs",
            description: "Craft stunning web and mobile applications effortlessly with TemplrJS, an open-source rapid development platform",
          },
          {
            title: "DuckDB Data Proxy",
            href: "/https://github.com/senthilsweb/duckdb-data-api",
            description: "Data API and micro orm for DuckDB and MotherDuck",
          },
          {
            title: "DuckDB Studio",
            href: "/duckdb-studio",
            description: "A simple, yet powerful web utility designed to explore and interact with DuckDB databases",
          },
          {
            title: "Data Pipeline Visualizer",
            href: "/data-pipeline-visulalizer",
            description: "Create and visualize complex data pipelines with an intuitive YAML-based interface",
          },
        ],
      },
    },
    {
     trigger: "Resources",
      content: {
        items: [
          {
            title: "REST API Documentation",
            href: "#",
            description: "Comprehensive RESTful API documentation for all my projects, including endpoints, usage examples, and authentication guidelines."
          },
          {
            title: "Professional Resume",
            href: "https://www.senthilsweb.com/resume/senthilnathan",
            description: "My detailed professional resume, highlighting skills, work experience, projects, and education."
          },
          {
            title: "Portfolio",
            href: "#",
            description: "A curated selection of my projects, case studies, and achievements."
          },
          {
            title: "Blog",
            href: "/blog",
            description: "Insights and articles on technology, data engineering, and project highlights."
          },
          {
            title: "LinkedIn",
            href: "https://www.linkedin.com/in/senthilsweb/",
            description: "Connect with me on LinkedIn to view my professional network and updates."
          },
          {
            title: "GitHub",
            href: "https://github.com/senthilsweb",
            description: "My open-source contributions and project repositories."
          }
        ]
      }
    }
  ],
};

const TopNav = () => {
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
  
  export default TopNav;
