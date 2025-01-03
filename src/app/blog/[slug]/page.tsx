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
      content, // Original markdown for ToC
      htmlContent, // Processed HTML for display
      title: data.title || "Untitled",
      description: data.description || "",
      author: data.author || "Anonymous",
      date: data.date || new Date().toISOString(),
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
  const params = await paramsPromise;
  const post = await getBlogPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#0A0A0A] dark:text-gray-100">
      {/* Hero Section */}
      <div className="relative">
        {/* Background pattern */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-tl from-green-50/90 via-white to-white dark:from-green-900/30 dark:via-gray-900 dark:to-gray-900" />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'url("/grid.svg")',
              backgroundSize: "40px 40px",
              backgroundPosition: "-1px -1px",
              mask: "linear-gradient(to bottom, white 50%, transparent)",
            }}
          />
        </div>

        <MaxWidthWrapper>
          <div className="relative pt-14 pb-20">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
              {post.title}
            </h1>
            <p className="mt-4 text-base leading-8 text-gray-600 dark:text-gray-400">
              {post.description}
            </p>

            {/* Author and Date */}
            <div className="mt-8 flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-gray-100 p-1 dark:bg-gray-800">
                  <svg
                    className="h-4 w-4 text-gray-500 dark:text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-5.5-2.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zM10 12a5.99 5.99 0 00-4.793 2.39A6.483 6.483 0 0010 16.5a6.483 6.483 0 004.793-2.11A5.99 5.99 0 0010 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {post.author}
                </span>
              </div>
              <span className="text-gray-300 dark:text-gray-600">•</span>
              <time
                dateTime={post.date}
                className="text-sm text-gray-500 dark:text-gray-400"
              >
                {formatDate(post.date)}
              </time>
            </div>

            {/* Tags */}
            <div className="mt-6 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag.text}
                  className={cn(
                    "inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset",
                    getTagColorClass(tag.text)
                  )}
                >
                  {tag.text}
                </span>
              ))}
            </div>
          </div>
        </MaxWidthWrapper>
      </div>

      {/* Main Content */}
      <MaxWidthWrapper>
        <div className="relative lg:flex lg:gap-10">
          {/* Desktop ToC */}
          <div className="hidden lg:block lg:w-64">
            <div className="sticky top-8 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
              <TableOfContents content={post.content} />
            </div>
          </div>

          {/* Article Content */}
          <div className="w-full max-w-none lg:w-[calc(100%-256px)]">
            {/* Mobile ToC */}
            <div className="lg:hidden mb-10">
              <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
                <TableOfContents content={post.content} />
              </div>
            </div>

            <div
              className="prose prose-lg dark:prose-invert max-w-none 
              prose-headings:scroll-mt-20
              prose-h1:text-gray-900 dark:prose-h1:text-white
              prose-h2:text-gray-900 dark:prose-h2:text-white
              prose-h3:text-gray-900 dark:prose-h3:text-white
              prose-p:text-gray-600 dark:prose-p:text-gray-300
              prose-strong:text-gray-900 dark:prose-strong:text-white
              prose-code:text-gray-900 dark:prose-code:text-gray-100
              prose-code:before:hidden prose-code:after:hidden
              prose-code:bg-gray-100 dark:prose-code:bg-gray-800
              prose-code:rounded-md prose-code:px-1 prose-code:py-0.5
              prose-pre:bg-gray-900 dark:prose-pre:bg-black
              prose-pre:border prose-pre:border-gray-200 dark:prose-pre:border-gray-800
              prose-a:text-blue-600 dark:prose-a:text-blue-400
              prose-a:no-underline hover:prose-a:underline
              prose-li:text-gray-600 dark:prose-li:text-gray-300
              prose-table:border-gray-200 dark:prose-table:border-gray-800
              prose-thead:border-gray-200 dark:prose-thead:border-gray-800
              prose-tr:border-gray-200 dark:prose-tr:border-gray-800
              prose-th:text-gray-900 dark:prose-th:text-white
              prose-td:text-gray-600 dark:prose-td:text-gray-300"
            >
              <div dangerouslySetInnerHTML={{ __html: post.htmlContent }} />
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
