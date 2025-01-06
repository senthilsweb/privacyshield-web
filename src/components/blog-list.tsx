"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { User, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { type BlogPost } from "@/types/blog";
import { Button } from "@/components/ui/button";

const POSTS_PER_PAGE = 6;

const BlogList = ({ initialPosts }: { initialPosts: BlogPost[] }) => {
  const [displayedPosts, setDisplayedPosts] = useState(
    initialPosts.slice(0, POSTS_PER_PAGE)
  );
  const [currentPage, setCurrentPage] = useState(1);

  const hasMorePosts = displayedPosts.length < initialPosts.length;

  const loadMore = () => {
    const nextPosts = initialPosts.slice(0, (currentPage + 1) * POSTS_PER_PAGE);
    setDisplayedPosts(nextPosts);
    setCurrentPage(currentPage + 1);
  };

  return (
    <MaxWidthWrapper>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedPosts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
            <Card className="h-full overflow-hidden hover:shadow-lg transition-all duration-200 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
              <div className="relative aspect-[16/9] overflow-hidden bg-gray-100 dark:bg-gray-700">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  priority={currentPage === 1}
                />
              </div>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-3">
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    <span>{post.author}</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <time dateTime={post.date}>
                      {format(new Date(post.date), "MMM d, yyyy")}
                    </time>
                  </div>
                </div>
                <h2 className="text-xl font-semibold mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 line-clamp-2">
                  {post.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 line-clamp-2 text-sm">
                  {post.description}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {hasMorePosts && (
        <div className="mt-12 text-center">
          <Button onClick={loadMore} variant="default" size="lg">
            Load More Posts
          </Button>
        </div>
      )}
    </MaxWidthWrapper>
  );
};

export default BlogList;
