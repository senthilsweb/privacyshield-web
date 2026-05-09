"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { User, Calendar, LayoutGrid, List, ArrowUpDown } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { type BlogPost } from "@/types/blog";
import { AbstractBlogCover } from "@/components/abstract-blog-cover";

const POSTS_PER_PAGE = 6;

type SortOption = "newest" | "oldest" | "az" | "za";
type ViewMode = "grid" | "list";

function sortPosts(posts: BlogPost[], sort: SortOption): BlogPost[] {
  return [...posts].sort((a, b) => {
    if (sort === "newest") return new Date(b.date).getTime() - new Date(a.date).getTime();
    if (sort === "oldest") return new Date(a.date).getTime() - new Date(b.date).getTime();
    if (sort === "az") return a.title.localeCompare(b.title);
    if (sort === "za") return b.title.localeCompare(a.title);
    return 0;
  });
}

const BlogList = ({ initialPosts }: { initialPosts: BlogPost[] }) => {
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [page, setPage] = useState(1);

  const sorted = useMemo(() => sortPosts(initialPosts, sortBy), [initialPosts, sortBy]);
  const displayed = sorted.slice(0, page * POSTS_PER_PAGE);
  const hasMore = displayed.length < sorted.length;

  const handleSortChange = (val: string) => {
    setSortBy(val as SortOption);
    setPage(1);
  };

  return (
    <MaxWidthWrapper>
      {/* Toolbar */}
      <div className="flex items-center justify-between mb-6 gap-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <ArrowUpDown className="h-4 w-4" />
          <Select value={sortBy} onValueChange={handleSortChange}>
            <SelectTrigger className="w-36 h-8 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest first</SelectItem>
              <SelectItem value="oldest">Oldest first</SelectItem>
              <SelectItem value="az">A → Z</SelectItem>
              <SelectItem value="za">Z → A</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-1 border rounded-md p-0.5">
          <Button
            variant={viewMode === "grid" ? "secondary" : "ghost"}
            size="icon"
            className="h-7 w-7"
            onClick={() => setViewMode("grid")}
            aria-label="Grid view"
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "secondary" : "ghost"}
            size="icon"
            className="h-7 w-7"
            onClick={() => setViewMode("list")}
            aria-label="List view"
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Grid view */}
      {viewMode === "grid" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {displayed.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
              <Card className="h-full overflow-hidden border border-border hover:shadow-md transition-shadow duration-200">
                {/* Cover with title */}
                <div className="relative aspect-[16/9] overflow-hidden">
                  <AbstractBlogCover
                    slug={post.slug}
                    title={post.title}
                    className="absolute inset-0"
                  />
                </div>

                {/* Meta */}
                <div className="p-4 space-y-2">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <User className="h-3.5 w-3.5" />
                      {post.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      {format(new Date(post.date), "MMM d, yyyy")}
                    </span>
                  </div>

                  <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                    {post.description}
                  </p>

                  {post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 pt-1">
                      {post.tags.slice(0, 3).map((tag) => (
                        <Badge
                          key={tag.text}
                          variant="secondary"
                          className="text-[10px] px-1.5 py-0 font-normal"
                        >
                          {tag.text}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}

      {/* List view */}
      {viewMode === "list" && (
        <div className="space-y-3">
          {displayed.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
              <Card className="overflow-hidden border border-border hover:shadow-md transition-shadow duration-200">
                <div className="flex gap-0">
                  {/* Thumbnail */}
                  <div className="relative w-36 flex-shrink-0 overflow-hidden">
                    <AbstractBlogCover
                      slug={post.slug}
                      className="absolute inset-0"
                    />
                    {/* force height via padding trick */}
                    <div className="aspect-[4/3]" />
                  </div>

                  {/* Content */}
                  <div className="flex flex-col justify-center px-5 py-3 gap-1.5 min-w-0">
                    <h2 className="font-semibold text-sm leading-snug group-hover:text-primary line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed hidden sm:block">
                      {post.description}
                    </p>
                    <div className="flex items-center flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {post.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {format(new Date(post.date), "MMM d, yyyy")}
                      </span>
                      {post.tags.slice(0, 3).map((tag) => (
                        <Badge
                          key={tag.text}
                          variant="secondary"
                          className="text-[10px] px-1.5 py-0 font-normal"
                        >
                          {tag.text}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}

      {/* Load more */}
      {hasMore && (
        <div className="mt-10 text-center">
          <Button onClick={() => setPage((p) => p + 1)} variant="outline" size="sm">
            Load more
          </Button>
        </div>
      )}
    </MaxWidthWrapper>
  );
};

export default BlogList;
