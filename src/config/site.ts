// src/config/site.ts
export const siteConfig = {
    name: "TemplrJS",
    title: {
      default: "TemplrJS: Open Source Developer Tooling Platform for React & Next.js",
      template: "%s | TemplrJS"
    },
    description: "TemplrJS is an open-source framework leveraging ReactJS, Next.js, ShadCN, and TailwindCSS to build fast, performance-optimized web and mobile applications. Powered by a modern, serverless architecture, it delivers a seamless developer experience.",
    url: "https://www.senthilsweb.com",
    ogImage: "i/blog/templrjs-architecture.png",
    authors: [
      {
        name: "Senthilnathan Karuppaiah",
        url: "https://www.senthilsweb.com"
      }
    ],
    creator: "Senthilnathan Karuppaiah",
    keywords: [
      "TemplrJS",
      "React",
      "Next.js",
      "ShadCN",
      "TailwindCSS",
      "Web Development",
      "Mobile Development",
      "Developer Tools",
      "Open Source",
      "JavaScript Framework"
    ],
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