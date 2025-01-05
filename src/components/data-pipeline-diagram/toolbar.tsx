"use client"

import { Button } from "@/components/ui/button"
import { Icon } from '@iconify/react'

interface ToolbarProps {
  onRender: () => void
  onTidy: () => void
}

export function Toolbar({ onRender, onTidy }: ToolbarProps) {
  return (
    <div className="flex items-center h-12 px-4 border-b bg-white dark:bg-gray-950">
      <div className="flex items-center gap-2">
        <Button 
          variant="ghost" 
          size="sm"
          onClick={onRender}
          className="flex items-center gap-2"
        >
          <Icon icon="ph:play-fill" className="h-4 w-4" />
          <span>Render</span>
        </Button>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={onTidy}
          className="flex items-center gap-2"
        >
          <Icon icon="ph:code" className="h-4 w-4" />
          <span>Tidy</span>
        </Button>
      </div>
    </div>
  )
}

