import matter from 'gray-matter'
import path from 'path'
import fs from 'fs'
import { type BlogPost, getTagColorClass } from "@/types/blog"

// Adjust the content path to point to your markdown files
const CONTENT_PATH = path.join(process.cwd(), 'src/content')

export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    // Debug: Log the content path and check if it exists
    console.log('Content path:', CONTENT_PATH)
    console.log('Directory exists:', fs.existsSync(CONTENT_PATH))

    // Check if directory exists
    if (!fs.existsSync(CONTENT_PATH)) {
      console.error('Content directory not found:', CONTENT_PATH)
      return []
    }

    const files = fs.readdirSync(CONTENT_PATH)
    
    // Debug: Log found files
    console.log('Found files:', files)

    const posts = files
      .filter(file => file.endsWith('.md'))
      .map(file => {
        const filePath = path.join(CONTENT_PATH, file)
        console.log('Reading file:', filePath)
        
        const content = fs.readFileSync(filePath, 'utf-8')
        const { data, content: fileContent } = matter(content)

        return {
          slug: file.replace('.md', ''),
          title: data.title || 'Untitled',
          description: data.description || 'No description available',
          coverImage: data.coverImage || '/images/placeholder-cover.jpg',
          date: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
          content: fileContent,
          htmlContent: '', 
          author: data.author || 'Anonymous',
          tags: (data.tags || []).map((tag: string) => ({
            text: tag,
            colorClass: getTagColorClass(tag)
          }))
        } as BlogPost
      })

    // Sort posts by date
    const sortedPosts = posts.sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    )

    console.log('Total posts found:', sortedPosts.length)

    return sortedPosts
  } catch (error) {
    console.error('Error loading blog posts:', error)
    return []
  }
}