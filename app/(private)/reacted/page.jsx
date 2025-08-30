"use client";

import React, { useEffect, useState, useCallback } from "react";
import client from "@/api/client";
import useAuth from "@/hooks/useAuth";
import { toast } from "sonner";
import PostCard from "@/components/posts/PostCard";
import PostCardSkeleton from "@/components/posts/PostCardSkeleton";
import BackButton from "@/components/common/BackButton";

const ReactedPostsPage = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReactedPosts = useCallback(async () => {
    if (!user) return;

    try {
      setLoading(true);

      // 1. Get the IDs of posts the user has reacted to
      const { data: reactedData, error: reactedError } = await client.rpc(
        "get_reacted_post_ids",
        { p_user_id: user.id }
      );

      if (reactedError) throw reactedError;

      const postIds = reactedData.map((r) => r.post_id);

      if (postIds.length === 0) {
        setPosts([]);
        return;
      }

      // 2. Fetch the full post data for those IDs
      const { data: postsData, error: postsError } = await client.rpc(
        "get_posts",
        {
          p_sort_by: "latest",
          p_mood: null,
          p_user_id: null,
          p_requesting_user_id: user.id,
          p_post_ids: postIds,
          p_page: 1,
          p_limit: 100, // Atau implementasikan infinite scroll di sini juga
        }
      );

      if (postsError) throw postsError;

      setPosts(postsData || []);
    } catch (error) {
      toast.error("Failed to fetch reacted posts: " + error.message);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchReactedPosts();
  }, [fetchReactedPosts]);

  const handlePostDeleted = (deletedPostId) => {
    setPosts((currentPosts) =>
      currentPosts.filter((p) => p.post_id !== deletedPostId)
    );
  };

  const renderContent = () => {
    if (loading) {
      return [...Array(3)].map((_, i) => <PostCardSkeleton key={i} />);
    }
    if (posts.length === 0) {
      return <p className="text-center text-muted-foreground mt-8">You haven't reacted to any posts yet.</p>;
    }
    return posts.map((post) => (
      <PostCard key={post.post_id} post={post} onPostDeleted={handlePostDeleted} onReactionToggled={fetchReactedPosts} />
    ));
  };

  return (
    <div className="flex min-h-screen flex-col items-center p-4 sm:p-8 md:p-12">
      <div className="w-full max-w-2xl">
        <div className="mb-4">
          <BackButton />
        </div>
        <h1 className="text-3xl font-bold mb-6">Reacted Posts</h1>
        <div className="space-y-6">{renderContent()}</div>
      </div>
    </div>
  );
};

export default ReactedPostsPage;
