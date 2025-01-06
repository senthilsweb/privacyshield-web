// src/app/blog/page.tsx
import { type NextPage } from "next";
import BlogList from "@/components/blog-list";
import { getBlogPosts } from "@/lib/blog";

export default async function BlogPage() {
  const posts = await getBlogPosts();
  return (
    <section className="px-4 md:px-6 lg:px-8 pb-10 py-10">
      <div className="container mx-auto max-w-6xl">
        <BlogList initialPosts={posts} />
      </div>
    </section>
  );
}
