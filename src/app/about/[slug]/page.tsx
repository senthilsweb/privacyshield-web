// src/app/blog/[slug]/page.tsx
import path from "path";
import fs from "fs";
import { notFound } from "next/navigation";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeHighlight from "rehype-highlight";
import rehypeStringify from "rehype-stringify";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { HeroPattern } from "@/components/HeroPattern";
import TableOfContents from "@/app/blog/[slug]/table-of-contents";
import { cn, formatDate } from "@/lib/utils";
import { type BlogPost, getTagColorClass } from "@/types/blog";
import { siteConfig } from "@/config/site";
import { generateMetadata as baseGenerateMetadata } from "@/lib/metadata";

const CONTENT_PATH = path.join(process.cwd(), "src/content");

// Single type for page props
interface BlogParams {
  params: {
    slug: string;
  };
}

// Utility functions
async function processMarkdown(content: string): Promise<string> {
  const result = await unified()
    .use(remarkParse)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings)
    .use(rehypeHighlight)
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(content);

  return result.toString();
}

function calculateReadingTime(content: string): string {
  const wordsPerMinute = 200;
  const wordCount = content.trim().split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);
  return `${readingTime} min read`;
}

async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const filePath = path.join(CONTENT_PATH, `${slug}.md`);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(fileContent);

    const htmlContent = await processMarkdown(content);
    const readingTime = calculateReadingTime(content);
    const stats = fs.statSync(filePath);

    const tags = (data.tags || []).map((tag: string) => ({
      text: tag,
      colorClass: getTagColorClass(tag),
    }));

    return {
      slug,
      content,
      htmlContent,
      title: data.title || "Untitled",
      description: data.description || "",
      author: data.author || "Anonymous",
      date: data.date || new Date().toISOString(),
      lastModified: stats.mtime.toISOString(),
      coverImage: data.coverImage || "/images/placeholder-cover.jpg",
      readingTime,
      tags,
    };
  } catch (error) {
    console.error("Error loading blog post:", error);
    return null;
  }
}

// Metadata generation
export async function generateMetadata({ params }: BlogParams) {
  const post = await getBlogPost(params.slug);
  
  if (!post) {
    return baseGenerateMetadata({
      title: 'Post Not Found',
      description: 'The requested blog post could not be found'
    });
  }

  return baseGenerateMetadata({
    title: post.title,
    description: post.description,
    image: post.coverImage,
    url: `/blog/${post.slug}`,
    keywords: post.tags.map(tag => tag.text)
  });
}

// Static params generation
export async function generateStaticParams() {
  const files = fs.readdirSync(CONTENT_PATH);
  return files
    .filter((filename) => filename.endsWith(".md"))
    .map((filename) => ({
      slug: filename.replace(".md", ""),
    }));
}

// JSON-LD Component
function BlogJsonLd({ post }: { post: BlogPost }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: post.coverImage,
    datePublished: post.date,
    dateModified: post.lastModified || post.date,
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: `${process.env.NEXT_PUBLIC_APP_URL}/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${process.env.NEXT_PUBLIC_APP_URL}/blog/${post.slug}`,
    },
    keywords: post.tags.map((tag) => tag.text).join(", "),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

// Main page component
export default async function BlogPost({ params }: BlogParams) {
  const post = await getBlogPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <BlogJsonLd post={post} />
      <div className="min-h-screen bg-white dark:bg-[#0A0A0A] dark:text-gray-100">
        <MaxWidthWrapper>
          {/* Hero Card not applicable here*/}
         

          {/* Content */}
          <div className="relative mx-auto max-w-prose py-10">
            <div className="relative lg:flex lg:gap-10">
              {/* Desktop ToC */}
              <div className="hidden lg:block lg:w-64 -ml-[17rem]">
                <div className="sticky top-8 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
                  <TableOfContents content={post.content} />
                </div>
              </div>

              {/* Main Content */}
              <div className="w-full">
                {/* Mobile ToC */}
                <div className="lg:hidden mb-10">
                  <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
                    <TableOfContents content={post.content} />
                  </div>
                </div>

                <div className="text-sm prose prose-lg dark:prose-invert max-w-none">
                  <div dangerouslySetInnerHTML={{ __html: post.htmlContent }} />
                </div>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </div>
    </>
  );
}