import React from "react";

// Pastel palettes: [background, triangle fill, text colour]
const PALETTES: [string, string, string][] = [
  ["#e9d5ff", "#9333ea", "#3b0764"], // purple
  ["#bfdbfe", "#2563eb", "#1e3a8a"], // blue
  ["#99f6e4", "#0d9488", "#134e4a"], // teal
  ["#fecdd3", "#e11d48", "#881337"], // rose
  ["#fde68a", "#d97706", "#78350f"], // amber
  ["#bbf7d0", "#16a34a", "#14532d"], // green
  ["#ddd6fe", "#7c3aed", "#1e1b4b"], // violet
  ["#fed7aa", "#ea580c", "#7c2d12"], // orange
];

interface AbstractBlogCoverProps {
  index?: number;
  slug?: string;
  title?: string;
  className?: string;
}

function hashFromString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 31 + str.charCodeAt(i)) & 0xffffffff;
  }
  return Math.abs(hash);
}

export function AbstractBlogCover({
  index,
  slug,
  title,
  className = "",
}: AbstractBlogCoverProps) {
  const paletteIndex =
    slug != null
      ? hashFromString(slug) % PALETTES.length
      : (index ?? 0) % PALETTES.length;

  const [bg, triangle, textColor] = PALETTES[paletteIndex];
  const dotId = `dot-${paletteIndex}`;

  return (
    <div
      className={`w-full h-full relative overflow-hidden ${className}`}
      style={{ backgroundColor: bg }}
    >
      {/* Dot grid */}
      <svg
        aria-hidden="true"
        className="absolute inset-0 w-full h-full pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id={dotId} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="3" cy="3" r="1.2" fill={triangle} fillOpacity="0.20" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${dotId})`} />
      </svg>

      {/* Large triangle — bottom right */}
      <svg
        aria-hidden="true"
        className="absolute bottom-0 right-0 pointer-events-none"
        style={{ width: "55%", height: "85%" }}
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <polygon points="200,0 200,200 0,200" fill={triangle} fillOpacity="0.22" />
      </svg>

      {/* Title overlay */}
      {title && (
        <div className="absolute inset-0 flex items-center justify-center p-5">
          <p
            className="text-center font-semibold leading-snug line-clamp-4 text-[0.95rem]"
            style={{ color: textColor }}
          >
            {title}
          </p>
        </div>
      )}
    </div>
  );
}
