"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const colors = [
  { name: "Zinc", bgClass: "bg-zinc-500" },
  { name: "Red", bgClass: "bg-red-500" },
  { name: "Rose", bgClass: "bg-rose-500" },
  { name: "Orange", bgClass: "bg-orange-500" },
  { name: "Green", bgClass: "bg-green-500" },
  { name: "Blue", bgClass: "bg-blue-500" },
  { name: "Yellow", bgClass: "bg-yellow-500" },
  { name: "Violet", bgClass: "bg-violet-500" },
];

export function ColorTheme() {
    
    const { resolvedTheme, setTheme } = useTheme()
    const [selectedColor, setSelectedColor] = React.useState('zinc')
    const [mounted, setMounted] = React.useState(false)

    useEffect(() => {
        const savedColor = localStorage.getItem('color-theme') || 'zinc'
        setSelectedColor(savedColor)
        document.documentElement.setAttribute('data-theme', savedColor)
        setMounted(true)
      }, [])
    
      const handleColorChange = (color: string) => {
        const lowerColor = color.toLowerCase()
        setSelectedColor(lowerColor)
        document.documentElement.setAttribute('data-theme', lowerColor)
        localStorage.setItem('color-theme', lowerColor)
      }
    
      if (!mounted) return null

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <div className={`h-4 w-4 rounded-full ${mounted ? `bg-${selectedColor}-500` : ''}`} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <div className="grid grid-cols-2 gap-2 p-2">
          {colors.map((c) => (
            <div
              key={c.name}
              className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer ${
                selectedColor === c.name.toLowerCase()
                  ? "bg-gray-100"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => handleColorChange(c.name.toLowerCase())}
            >
              <div
                className={`h-4 w-4 rounded-full bg-${c.name.toLowerCase()}-500`}
              />
              <span>{c.name}</span>
            </div>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}