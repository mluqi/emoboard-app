import React from "react";
import PostCard from "./PostCard";
import PostCardSkeleton from "./PostCardSkeleton";
import InfiniteScroll from "react-infinite-scroll-component";

const PostList = ({
  posts,
  loading,
  onPostDeleted,
  onReactionToggled,
  fetchMoreData,
  hasMore,
  emptyMessage = "No posts found. Why not create one?",
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
    return <p className="text-center text-muted-foreground mt-8">{emptyMessage}</p>;
  }

  return (
    <InfiniteScroll
      dataLength={posts.length}
      next={fetchMoreData}
      hasMore={hasMore}
      loader={<PostCardSkeleton />}
      endMessage={
        <p className="text-center text-muted-foreground mt-8">
          <b>You have seen it all!</b>
        </p>
      }
      className="w-full max-w-2xl space-y-6"
    >
      {posts.map((post) => (
        <PostCard
          key={post.post_id}
          post={post}
          onPostDeleted={onPostDeleted}
          onReactionToggled={onReactionToggled}
        />
      ))}
    </InfiniteScroll>
  );
};

export default PostList;
