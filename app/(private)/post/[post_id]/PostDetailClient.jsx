"use client";

import React from "react";
import Link from "next/link";
import PostCard from "@/components/posts/PostCard";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const PostDetailClient = ({ post }) => {
  if (!post) {
    return <div className="text-center p-8">Post not found.</div>;
  }

  return (
    <div className="w-full max-w-2xl">
      <div className="mb-4">
        <Button asChild variant="outline" size="sm">
          <Link href="/dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Feed
          </Link>
        </Button>
      </div>
      <PostCard post={post} isDetailPage={true} />
    </div>
  );
};

export default PostDetailClient;
