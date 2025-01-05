"use client"

import { Toolbar } from './toolbar'
import { useTheme } from "next-themes"

interface EditorProps {
    value: string
    onChange: (value: string) => void
    onRender: () => void
    onTidy: () => void
  }
  
  const Editor: React.FC<EditorProps> = ({ value, onChange, onRender, onTidy }) => {
    const { theme } = useTheme()
  
    return (
      <div className="h-full flex flex-col">
        <Toolbar onTidy={onTidy} onRender={onRender} />
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`flex-1 w-full p-4 font-mono text-sm resize-none focus:ring-0 focus:outline-none
            ${theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'}
            border-0`}
          spellCheck={false}
        />
      </div>
    )
  }
  
  export default Editor

