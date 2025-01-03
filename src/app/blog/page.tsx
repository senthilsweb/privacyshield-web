import { type NextPage } from 'next'
import matter from 'gray-matter'
import path from 'path'
import fs from 'fs'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import MaxWidthWrapper from '@/components/max-width-wrapper'

const CONTENT_PATH = path.join(process.cwd(), 'src/content')

interface BlogPost {
  slug: string
  title: string
  description: string
  coverImage: string
  date: string
}

async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const files = fs.readdirSync(CONTENT_PATH)
    const posts = files
      .filter(file => file.endsWith('.md'))
      .map(file => {
        const content = fs.readFileSync(path.join(CONTENT_PATH, file), 'utf-8')
        const { data } = matter(content)
        return {
          slug: file.replace('.md', ''),
          title: data.title,
          description: data.description,
          coverImage: data.coverImage || '/images/placeholder-cover.jpg',
          date: data.date || 'No date'
        }
      })
    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  } catch (error) {
    console.error('Error loading blog posts:', error)
    return []
  }
}

export default async function BlogPage() {
  const posts = await getBlogPosts()

  return (
    <MaxWidthWrapper className="py-10">
      <h1 className="text-4xl font-bold mb-8">Blog Posts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <a 
            key={post.slug} 
            href={`/blog/${post.slug}`}
            className="group hover:shadow-lg transition-all duration-200 rounded-lg border overflow-hidden bg-white dark:bg-gray-800"
          >
            <div className="relative aspect-video overflow-hidden">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-200 group-hover:scale-105"
              />
            </div>
            <div className="p-6">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
              <h2 className="text-2xl font-semibold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                {post.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 line-clamp-2">
                {post.description}
              </p>
            </div>
          </a>
        ))}
      </div>
    </MaxWidthWrapper>
  )
}