// src/config/site.ts
export const siteConfig = {
    name: "TemplrJS",
    title: {
      default: "TemplrJS: Open Source Developer Tooling Platform for React & Next.js",
      template: "%s | TemplrJS"
    },
    description: "TemplrJS is an open-source framework leveraging ReactJS, Next.js, ShadCN, and TailwindCSS to build fast, performance-optimized web and mobile applications.",
    url: "https://www.senthilsweb.com",
    ogImage: "i/blog/templrjs-architecture.png",
    authors: [
      {
        name: "Senthilnathan Karuppaiah",
        url: "https://www.senthilsweb.com",
        email: "senthilsweb@gmail.com"
      }
    ],
    creator: "Senthilnathan Karuppaiah",
    footer: {
      menuItems: [
        {
          trigger: "Projects",
          content: {
            items: [
              {
                title: "TemplrJS",
                href: "https://github.com/senthilsweb/templrjs",
                description: "Open-source rapid development platform"
              },
              {
                title: "DuckDB Data Proxy",
                href: "https://github.com/senthilsweb/duckdb-data-api",
                description: "Data API for DuckDB and MotherDuck"
              },
              {
                title: "DuckDB Studio",
                href: "https://github.com/senthilsweb/duckdb-studio",
                description: "Web utility for DuckDB databases"
              }
            ]
          }
        },
        {
          trigger: "Resources",
          content: {
            items: [
              {
                title: "REST API Documentation",
                href: "/docs/api",
                description: "API documentation and guidelines"
              },
              {
                title: "Professional Resume",
                href: "/resume",
                description: "Skills and experience"
              },
              {
                title: "Portfolio",
                href: "/portfolio",
                description: "Projects and achievements"
              },
              {
                title: "Blog",
                href: "/blog",
                description: "Articles and insights"
              }
            ]
          }
        },
        {
          trigger: "Contact",
          content: {
            items: [
              {
                title: "GitHub",
                href: "https://github.com/senthilsweb",
                icon: "gitHub"
              },
              {
                title: "LinkedIn",
                href: "https://www.linkedin.com/in/senthilsweb/",
                icon: "linkedin"
              },
              {
                title: "Instagram",
                href: "https://instagram.com/senthilsweb",
                icon: "instagram"
              }
            ]
          }
        }
      ]
    },
    links: {
      github: "https://github.com/senthilsweb/privacyshield-web/",
      twitter: "#"
    },
    locale: "en_US",
    verification: {
      google: "your-google-site-verification",
      yandex: "your-yandex-verification",
      yahoo: "your-yahoo-verification"
    }
  } as const
  
  export type SiteConfig = typeof siteConfig