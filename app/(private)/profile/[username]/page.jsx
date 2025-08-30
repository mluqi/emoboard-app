"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import client from "@/api/client";
import { toast } from "sonner";
import BackButton from "@/components/common/BackButton";
import useAuth from "@/hooks/useAuth";
import EmoBoardLoader from "@/components/common/EmoBoardLoader";
import PostList from "@/components/posts/PostList";
import ProfileHeader from "@/components/profile/ProfileHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ProfilePage = () => {
  const { username } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [postsLoading, setPostsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("posts");
  const [mentionedPosts, setMentionedPosts] = useState([]);
  const [mentionedPostsLoading, setMentionedPostsLoading] = useState(false);

  useEffect(() => {
    if (!username) return;

    const fetchProfile = async () => {
      try {
        setLoading(true);
        const { data, error: profileError } = await client
          .from("profiles")
          .select("*")
          .eq("username", username)
          .single();

        if (profileError) {
          throw profileError;
        }

        if (data) {
          setProfile(data);
        } else {
          setError("Profile not found.");
        }
      } catch (err) {
        setError(err.message);
        toast.error("Failed to fetch profile: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [username]);

  const { user } = useAuth();

  const fetchPosts = useCallback(async () => {
    if (!profile?.id) return; // Pastikan profile.id tersedia

    setPostsLoading(true);
    try {
      const { data, error: postsError } = await client.rpc("get_posts", {
        p_sort_by: "latest", // Default sort for profile page
        p_mood: null,
        p_user_id: profile.id, // Filter posts by this profile's ID
        p_requesting_user_id: user?.id || null, // ID pengguna yang sedang login
        p_post_ids: null,
      });

      if (postsError) throw postsError;
      setPosts(data || []);
    } catch (error) {
      toast.error("Failed to fetch posts: " + error.message);
    } finally {
      setPostsLoading(false);
    }
  }, [profile?.id, user?.id]);

  const fetchMentionedPosts = useCallback(async () => {
    if (!profile?.id) return;
    setMentionedPostsLoading(true);
    try {
      const { data, error } = await client.rpc("get_mentioned_posts", {
        p_user_id: profile.id,
        p_requesting_user_id: user?.id || null,
      });

      if (error) throw error;
      setMentionedPosts(data || []);
    } catch (error) {
      toast.error("Failed to fetch mentioned posts: " + error.message);
    } finally {
      setMentionedPostsLoading(false);
    }
  }, [profile?.id, user?.id]);

  useEffect(() => {
    if (profile) {
      if (activeTab === "posts") {
        fetchPosts();
      } else if (activeTab === "mentions") {
        fetchMentionedPosts();
      }
    }
  }, [profile, activeTab, fetchPosts, fetchMentionedPosts]);

  const handlePostDeleted = (deletedPostId) => {
    setPosts((currentPosts) =>
      currentPosts.filter((p) => p.post_id !== deletedPostId)
    );
  };

  if (loading) return <EmoBoardLoader />;
  if (error)
    return <div className="text-center text-destructive p-8">{error}</div>;
  if (!profile)
    return <div className="text-center p-8">Profile not found.</div>;
  
  return (
    <div className="flex min-h-screen flex-col items-center p-4 sm:p-8 md:p-12">
      <div className="w-full max-w-2xl">
        <div className="mb-4">
          <BackButton />
        </div>
        <ProfileHeader profile={profile} />
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="mt-6 w-full"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="posts">Posts</TabsTrigger>
            <TabsTrigger value="mentions">Mentions</TabsTrigger>
          </TabsList>
          <TabsContent value="posts" className="mt-6">
            <PostList
              posts={posts}
              loading={postsLoading}
              onPostDeleted={handlePostDeleted}
              onReactionToggled={fetchPosts}
              emptyMessage={`@${username} hasn't posted anything yet.`}
            />
          </TabsContent>
          <TabsContent value="mentions" className="mt-6">
            <PostList
              posts={mentionedPosts}
              loading={mentionedPostsLoading}
              onPostDeleted={(id) => {
                setMentionedPosts((prev) =>
                  prev.filter((p) => p.post_id !== id)
                );
              }}
              onReactionToggled={fetchMentionedPosts}
              emptyMessage={`@${username} hasn't been mentioned in any posts yet.`}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProfilePage;
