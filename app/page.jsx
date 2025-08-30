"use client";

import React, { useState, useEffect, useCallback } from "react";
import PostList from "@/components/posts/PostList";
import AddPostSnippet from "@/components/posts/AddPostSnippet";
import PostFilters from "@/components/posts/PostFilters";
import client from "@/api/client";
import { toast } from "sonner";
import useAuth from "@/hooks/useAuth";

const POSTS_PER_PAGE = 10;

const HomePage = () => {
  const [sortOption, setSortOption] = useState("latest");
  const [moodOption, setMoodOption] = useState("all");

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const { user } = useAuth();

  const fetchPosts = useCallback(
    async (pageNum) => {
      if (pageNum === 1) {
        setLoading(true);
      }

      try {
        const { data, error } = await client.rpc("get_posts", {
          p_sort_by: sortOption,
          p_mood: moodOption === "all" ? null : moodOption,
          p_user_id: null, // Dashboard menampilkan semua post
          p_requesting_user_id: user?.id || null,
          p_post_ids: null,
          p_page: pageNum,
          p_limit: POSTS_PER_PAGE,
        });

        if (error) throw error;

        const newPosts = data || [];
        setPosts((prevPosts) =>
          pageNum === 1 ? newPosts : [...prevPosts, ...newPosts]
        );

        if (newPosts.length < POSTS_PER_PAGE) {
          setHasMore(false);
        } else {
          setHasMore(true);
        }
        setPage(pageNum);
      } catch (error) {
        toast.error("Failed to fetch posts: " + error.message);
      } finally {
        setLoading(false);
      }
    },
    [sortOption, moodOption, user]
  );

  useEffect(() => {
    // Reset and fetch when filters or user change
    fetchPosts(1);
  }, [fetchPosts]); // fetchPosts dependency includes sortOption, moodOption, user

  const handlePostDeleted = (deletedPostId) => {
    setPosts((currentPosts) =>
      currentPosts.filter((p) => p.post_id !== deletedPostId)
    );
  };

  const refreshPosts = () => {
    fetchPosts(1);
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
        <AddPostSnippet onPostCreated={refreshPosts} />
        <PostFilters
          sortOption={sortOption}
          moodOption={moodOption}
          onSortChange={setSortOption}
          onMoodChange={setMoodOption}
        />
        <PostList
          posts={posts}
          loading={loading && page === 1}
          onPostDeleted={handlePostDeleted}
          onReactionToggled={refreshPosts}
          fetchMoreData={() => fetchPosts(page + 1)}
          hasMore={hasMore}
        />
      </div>
    </div>
  );
};

export default HomePage;
