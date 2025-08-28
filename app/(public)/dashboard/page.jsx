"use client";

import React, { useState, useEffect, useCallback } from "react";
import PostList from "@/components/posts/PostList";
import AddPostSnippet from "@/components/posts/AddPostSnippet";
import PostFilters from "@/components/posts/PostFilters";
import client from "@/api/client";
import { toast } from "sonner";
import useAuth from "@/hooks/useAuth";

const DashboardPage = () => {
  const [sortOption, setSortOption] = useState('latest');
  const [moodOption, setMoodOption] = useState('all');

    // State dan logika diangkat dari PostList
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await client.rpc("get_posts", {
        p_sort_by: sortOption,
        p_mood: moodOption === "all" ? null : moodOption,
        p_user_id: null, // Dashboard menampilkan semua post
        p_requesting_user_id: user?.id || null,
        p_post_ids: null,
      });

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      toast.error("Failed to fetch posts: " + error.message);
    } finally {
      setLoading(false);
    }
  }, [sortOption, moodOption, user]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handlePostDeleted = (deletedPostId) => {
    setPosts((currentPosts) =>
      currentPosts.filter((p) => p.post_id !== deletedPostId)
    );
  };


  useEffect(() => {
    const hash = window.location.hash.substring(1);
    if (hash) {
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center p-4 sm:p-8 md:p-12">
      <div className="w-full max-w-2xl">
                <AddPostSnippet onPostCreated={fetchPosts} />
        <PostFilters
          sortOption={sortOption}
          moodOption={moodOption}
          onSortChange={setSortOption}
          onMoodChange={setMoodOption}
        />
          <PostList
            posts={posts}
            loading={loading}
            onPostDeleted={handlePostDeleted}
            onReactionToggled={fetchPosts}
          />
      </div>
    </div>
  );
};

export default DashboardPage;
