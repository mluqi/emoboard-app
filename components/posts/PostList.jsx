import React from "react";
import PostCard from "./PostCard";
import PostCardSkeleton from "./PostCardSkeleton";

const PostList = ({
  posts,
  loading,
  onPostDeleted,
  onReactionToggled,
}) => {
  if (loading) {
    return (
      <div className="w-full max-w-2xl space-y-6">
        {[...Array(3)].map((_, i) => (
          <PostCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!posts || posts.length === 0) {
    return <p className="text-center text-muted-foreground mt-8">No posts found. Why not create one?</p>;
  }

  return (
    <div className="w-full max-w-2xl space-y-6">
      {posts.map((post) => (
        <PostCard
          key={post.post_id}
          post={post}
          onPostDeleted={onPostDeleted}
          onReactionToggled={onReactionToggled}
        />
      ))}
    </div>
  );
};

export default PostList;
