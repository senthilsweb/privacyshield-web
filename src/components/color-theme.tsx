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
import { cn } from "@/lib/utils";

const colors = [
 // Row 1
 { name: "Red", value: "red", class: "bg-red-500" },
 { name: "Orange", value: "orange", class: "bg-orange-500" },
 { name: "Amber", value: "amber", class: "bg-amber-500" },
 { name: "Yellow", value: "yellow", class: "bg-yellow-500" },
 { name: "Lime", value: "lime", class: "bg-lime-500" },
 
 // Row 2
 { name: "Green", value: "green", class: "bg-green-500" },
 { name: "Emerald", value: "emerald", class: "bg-emerald-500" },
 { name: "Teal", value: "teal", class: "bg-teal-500" },
 { name: "Cyan", value: "cyan", class: "bg-cyan-500" },
 { name: "Sky", value: "sky", class: "bg-sky-500" },

 // Row 3
 { name: "Blue", value: "blue", class: "bg-blue-500" },
 { name: "Indigo", value: "indigo", class: "bg-indigo-500" },
 { name: "Violet", value: "violet", class: "bg-violet-500" },
 { name: "Purple", value: "purple", class: "bg-purple-500" },
 { name: "Fuchsia", value: "fuchsia", class: "bg-fuchsia-500" },

 // Row 4
 { name: "Pink", value: "pink", class: "bg-pink-500" },
 { name: "Rose", value: "rose", class: "bg-rose-500" },
 
 // Row 5 (Monochrome)
 { name: "Zinc", value: "zinc", class: "bg-zinc-500" },
];

export function ColorTheme() {
  const { resolvedTheme, setTheme } = useTheme();
  const [selectedColor, setSelectedColor] = React.useState('zinc');
  const [mounted, setMounted] = React.useState(false);

  useEffect(() => {
    const savedColor = localStorage.getItem('color-theme') || 'zinc';
    setSelectedColor(savedColor);
    document.documentElement.setAttribute('data-theme', savedColor);
    setMounted(true);
  }, []);

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
    document.documentElement.setAttribute('data-theme', color);
    localStorage.setItem('color-theme', color);
  };

  if (!mounted) return null;

  const selectedColorClass = colors.find(c => c.value === selectedColor)?.class || 'bg-zinc-500';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <div className={cn("h-4 w-4 rounded-full", mounted ? selectedColorClass : '')} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <div className="grid grid-cols-2 gap-2 p-2">
          {colors.map((color) => (
            <div
              key={color.name}
              className={cn(
                "flex items-center gap-2 p-2 rounded-lg cursor-pointer",
                selectedColor === color.value
                  ? "bg-gray-100 dark:bg-gray-800"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800"
              )}
              onClick={() => handleColorChange(color.value)}
            >
              <div className={cn("h-4 w-4 rounded-full", color.class)} />
              <span>{color.name}</span>
            </div>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}