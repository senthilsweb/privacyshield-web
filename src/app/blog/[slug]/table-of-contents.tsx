'use client'

import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

interface TableOfContentsProps {
  content: string
}

export default function TableOfContents({ content }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('')
  const headings = extractHeadings(content)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: '-20% 0% -35% 0%' }
    )

    const headingElements = document.querySelectorAll('h2, h3')
    headingElements.forEach((element) => observer.observe(element))

    return () => {
      headingElements.forEach((element) => observer.unobserve(element))
    }
  }, [])

  if (headings.length === 0) return null

  return (
    <nav className="relative">
      <div className="font-medium text-gray-900 dark:text-white mb-4">On this page</div>
      <ul className="space-y-3 text-sm">
        {headings.map((heading, index) => (
          <li key={index}>
            <a
              href={`#${heading.id}`}
              onClick={(e) => {
                e.preventDefault()
                document.getElementById(heading.id)?.scrollIntoView({
                  behavior: 'smooth'
                })
              }}
              className={cn(
                'block transition-colors duration-200',
                heading.level === 2 
                  ? 'font-medium' 
                  : 'pl-4',
                heading.id === activeId
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300'
              )}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

function extractHeadings(content: string) {
  const headingLines = content.split('\n').filter(line => /^#{2,3}\s/.test(line))
  return headingLines.map(line => {
    const level = line.match(/^#+/)?.[0].length || 2
    const text = line.replace(/^#+\s+/, '')
    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    return { id, text, level }
  })
}