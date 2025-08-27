import React, { useEffect, useState } from "react";
import client from "@/api/client";
import { toast } from "sonner";
import PostCard from "./PostCard";

const PostList = ({ userId }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  const handlePostDeleted = (deletedPostId) => {
    setPosts((currentPosts) =>
      currentPosts.filter((p) => p.post_id !== deletedPostId)
    );
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        let query = client
          .from("posts")
          .select(
            "*, profile:profiles(username, avatar_url, full_name), comments(count)"
          )
          .order("created_at", { ascending: false });

        if (userId) {
          query = query.eq("user_id", userId).eq("is_anonymous", false);
        }

        const { data, error } = await query;
        if (error) throw error;
        setPosts(data);
      } catch (error) {
        toast.error("Failed to fetch posts: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();

    const channel = client.channel('realtime posts')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'posts' }, () => {
        setRefreshKey(prev => prev + 1);
      }).subscribe();

    return () => {
      client.removeChannel(channel);
    };
  }, [userId, refreshKey]);

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
