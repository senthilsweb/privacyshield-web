// src/app/blog/[slug]/page.tsx

import { type NextPage } from "next";
import matter from "gray-matter";
import path from "path";
import fs from "fs";
import { notFound } from "next/navigation";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { cn, formatDate } from "@/lib/utils";
import TableOfContents from "./table-of-contents";
import { type BlogPost, getTagColorClass } from "@/types/blog";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeHighlight from "rehype-highlight";
import rehypeStringify from "rehype-stringify";
import { HeroPattern } from '@/components/HeroPattern'

const CONTENT_PATH = path.join(process.cwd(), "src/content");

async function processMarkdown(content: string): Promise<string> {
  const result = await unified()
    .use(remarkParse) // Parse markdown
    .use(remarkRehype, { allowDangerousHtml: true }) // Convert to HTML
    .use(rehypeSlug) // Add ids to headings
    .use(rehypeAutolinkHeadings) // Add links to headings
    .use(rehypeHighlight) // Syntax highlighting
    .use(rehypeStringify, { allowDangerousHtml: true }) // Convert to string
    .process(content);

  return result.toString();
}

async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const filePath = path.join(CONTENT_PATH, `${slug}.md`);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(fileContent);

    // Process markdown to HTML
    const htmlContent = await processMarkdown(content);

    // Process tags with color classes
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
      coverImage: data.coverImage || '/images/placeholder-cover.jpg', // Add this line
      tags,
    };
  } catch (error) {
    console.error("Error loading blog post:", error);
    return null;
  }
}

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}


export default async function BlogPostPage({
  params: paramsPromise,
}: PageProps) {
  // Await the params
  const params = await paramsPromise;
  const post = await getBlogPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#0A0A0A] dark:text-gray-100">
      <MaxWidthWrapper>
        {/* Narrow Hero Card */}
        <div className="relative mx-auto text-base max-w-prose lg:max-w-none px-6 py-6">
          <div className="relative rounded-lg border m-2">
            <div className="absolute inset-0 z-10 mx-0 max-w-none overflow-hidden rounded-2xl">
              <HeroPattern />
            </div>

            <div className="relative p-4">
              <h1 className="text-2xl tracking-tight text-gray-900 dark:text-white">
                {post.title}
              </h1>
              <p className="mt-2 text-sm text-slate-800 dark:text-slate-200">
                {post.description}
              </p>
              
              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center gap-2">
                  <svg className="h-6 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-5.5-2.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zM10 12a5.99 5.99 0 00-4.793 2.39A6.483 6.483 0 0010 16.5a6.483 6.483 0 004.793-2.11A5.99 5.99 0 0010 12z" clipRule="evenodd" />
                  </svg>
                  <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                    {post.author}
                  </p>
                </div>
                
                <time className="text-gray-500 text-sm">
                  {formatDate(post.date)}
                </time>
              </div>

              <div className="pt-4 flex flex-wrap justify-left gap-x-2 gap-y-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag.text}
                    className={cn(
                      "inline-flex items-center rounded-md px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset",
                      getTagColorClass(tag.text)
                    )}
                  >
                    {tag.text}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Rest of the content */}
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

              <div className="prose prose-lg dark:prose-invert max-w-none">
                <div dangerouslySetInnerHTML={{ __html: post.htmlContent }} />
              </div>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
}