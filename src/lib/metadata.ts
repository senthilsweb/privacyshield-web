// src/lib/metadata.ts
import { Metadata } from "next"
import { siteConfig } from "@/config/site"

type MetadataProps = {
  title?: string
  description?: string
  image?: string
  url?: string
  keywords?: string[]
}

export function generateMetadata({
  title,
  description,
  image,
  url,
  keywords,
}: MetadataProps = {}): Metadata {
  const metaDescription = description || siteConfig.description
  const metaUrl = url ? `${siteConfig.url}${url}` : siteConfig.url
  const metaImage = image || siteConfig.ogImage
  const metaKeywords = keywords || siteConfig.keywords

  return {
    title: title ? {
      default: title,
      template: siteConfig.title.template
    } : siteConfig.title,
    description: metaDescription,
    keywords: metaKeywords,
    authors: siteConfig.authors,
    creator: siteConfig.creator,
    publisher: siteConfig.creator,
    openGraph: {
      title: title || siteConfig.title.default,
      description: metaDescription,
      url: metaUrl,
      siteName: siteConfig.name,
      images: [
        {
          url: metaImage,
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} - ${title || siteConfig.title.default}`
        }
      ],
      locale: siteConfig.locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: title || siteConfig.title.default,
      description: metaDescription,
      images: [metaImage],
      creator: siteConfig.links.twitter.split("twitter.com/")[1],
      site: siteConfig.links.twitter.split("twitter.com/")[1]
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: siteConfig.verification,
    alternates: {
      canonical: metaUrl,
      languages: {
        "en-US": metaUrl,
      },
    },
  }
}