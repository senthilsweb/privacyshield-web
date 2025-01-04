import { type NextPage } from 'next'
import BlogList from '@/components/blog-list'
import { getBlogPosts } from '@/lib/blog'

export default async function BlogPage() {
  const posts = await getBlogPosts()
  return <BlogList initialPosts={posts} />
}