"use client";

import React from "react";
import BackButton from "@/components/common/BackButton";
import PostCard from "@/components/posts/PostCard";

const PostDetailClient = ({ post }) => {
  if (!post) {
    return <div className="text-center p-8">Post not found.</div>;
  }

  return (
    <div className="w-full max-w-2xl">
      <div className="mb-4">
        <BackButton />
      </div>
      <PostCard post={post} isDetailPage={true} />
    </div>
  );
};

export default PostDetailClient;
