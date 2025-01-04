// src/types/blog.ts


export interface BlogPost {
  slug: string
  content: string
  htmlContent: string
  title: string
  description: string
  author: string
  date: string
  lastModified?: string
  coverImage: string
  readingTime: string
  tags: {
    text: string
    colorClass: string
  }[]
}
  // Helper function to get tag color classes
  const colors = [
    "text-sky-700 bg-sky-50 ring-sky-600/20 dark:text-sky-300 dark:bg-sky-400/10 dark:ring-sky-400/20",
    "text-green-700 bg-green-50 ring-green-600/20 dark:text-green-300 dark:bg-green-400/10 dark:ring-green-400/20",
    "text-blue-700 bg-blue-50 ring-blue-600/20 dark:text-blue-300 dark:bg-blue-400/10 dark:ring-blue-400/20",
    "text-indigo-700 bg-indigo-50 ring-indigo-600/20 dark:text-indigo-300 dark:bg-indigo-400/10 dark:ring-indigo-400/20",
    "text-violet-700 bg-violet-50 ring-violet-600/20 dark:text-violet-300 dark:bg-violet-400/10 dark:ring-violet-400/20",
    "text-purple-700 bg-purple-50 ring-purple-600/20 dark:text-purple-300 dark:bg-purple-400/10 dark:ring-purple-400/20",
    "text-pink-700 bg-pink-50 ring-pink-600/20 dark:text-pink-300 dark:bg-pink-400/10 dark:ring-pink-400/20",
    "text-rose-700 bg-rose-50 ring-rose-600/20 dark:text-rose-300 dark:bg-rose-400/10 dark:ring-rose-400/20"
  ];
  
  export function getTagColorClass(tag: string): string {
    // Add your tag color mapping logic here
    const tagColors: Record<string, string> = {
      typescript: "text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/30 ring-blue-600/20",
      react: "text-cyan-700 dark:text-cyan-300 bg-cyan-50 dark:bg-cyan-900/30 ring-cyan-600/20",
      nextjs: "text-black dark:text-white bg-gray-50 dark:bg-gray-900/30 ring-gray-600/20",
      // Add more tag colors as needed
    }
  
    return tagColors[tag.toLowerCase()] || "text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-900/30 ring-gray-600/20"
  }
  