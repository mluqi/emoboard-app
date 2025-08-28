import React, { useEffect, useState } from "react";
import client from "@/api/client";
import { toast } from "sonner";
import PostCard from "./PostCard";
import PostCardSkeleton from "./PostCardSkeleton";
import useAuth from "@/hooks/useAuth";

const PostList = ({ userId, sortOption = "latest", moodOption = "all" }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const handlePostDeleted = (deletedPostId) => {
    setPosts((currentPosts) =>
      currentPosts.filter((p) => p.post_id !== deletedPostId)
    );
  };

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const { data, error } = await client.rpc("get_posts", {
        p_sort_by: sortOption,
        p_mood: moodOption === "all" ? null : moodOption,
        p_user_id: userId || null,
        p_requesting_user_id: user?.id,
        p_post_ids: null,
      });

      if (error) throw error;

      setPosts(data || []);
    } catch (error) {
      toast.error("Failed to fetch posts: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [userId, sortOption, moodOption, user]);

  if (loading) {
    return (
      <div className="w-full max-w-2xl space-y-6 mt-8">
        {[...Array(3)].map((_, i) => (
          <PostCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (posts.length === 0)
    return <p className="text-sm text-muted-foreground">No posts yet.</p>;

  return (
    <div className="w-full max-w-2xl space-y-6 mt-8">
      {posts.map((post) => (
        <PostCard
          key={post.post_id}
          post={post}
          onPostDeleted={handlePostDeleted}
          onReactionToggled={fetchPosts}
        />
      ))}
    </div>
  );
};

export default PostList;
