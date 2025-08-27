import React, { useEffect, useState } from "react";
import client from "@/api/client";
import { toast } from "sonner";
import PostCard from "./PostCard";

const PostList = ({ userId, sortOption = 'latest', moodOption = 'all' }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const handlePostDeleted = (deletedPostId) => {
    setPosts((currentPosts) =>
      currentPosts.filter((p) => p.post_id !== deletedPostId)
    );
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const { data, error } = await client.rpc('get_posts', {
          p_sort_by: sortOption,
          p_mood: moodOption === 'all' ? null : moodOption,
          p_user_id: userId,
        });

        if (error) throw error;

        // Adapt the data structure to match what PostCard expects
        const formattedData = data.map(post => ({
          ...post,
          comments: [{ count: post.comment_count }]
        }));

        setPosts(formattedData);
      } catch (error) {
        toast.error("Failed to fetch posts: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();

  }, [userId, sortOption, moodOption]);

  if (loading)
    return <p className="text-sm text-muted-foreground">Loading posts...</p>;
  if (posts.length === 0)
    return <p className="text-sm text-muted-foreground">No posts yet.</p>;

  return (
    <div className="w-full max-w-2xl space-y-6 mt-8">
      {posts.map((post) => (
        <PostCard
          key={post.post_id}
          post={post}
          onPostDeleted={handlePostDeleted}
        />
      ))}
    </div>
  );
};

export default PostList;
