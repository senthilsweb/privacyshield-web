// src/types/blog.ts

interface BlogPost {
  slug: string // Add this field
  content: string
  htmlContent: string
  coverImage: string
  title: string
  description: string
  author: string
  date: string
  tags: Array<{
    text: string
    colorClass: string
  }>
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
  
  function getTagColorClass(tag: string): string {
    // Hash the tag string to get a consistent index
    const hashCode = tag.split('').reduce((acc, char) => {
      return char.charCodeAt(0) + ((acc << 5) - acc);
    }, 0);
    
    // Use the hash to pick a color
    const index = Math.abs(hashCode) % colors.length;
    return colors[index];
  }
  
  export type { BlogPost }
  export { getTagColorClass }