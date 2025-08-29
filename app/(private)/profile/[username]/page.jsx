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

const ProfilePage = () => {
  const { username } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [postsLoading, setPostsLoading] = useState(true);
  const [error, setError] = useState(null);

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

  useEffect(() => {
    if (profile) {
      fetchPosts();
    }
  }, [profile, fetchPosts]);

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
        <div className="mt-8 border-t pt-8">
          <h2 className="text-2xl font-bold mb-6">
            Posts by {profile.username}
          </h2>
          <PostList
            posts={posts}
            loading={postsLoading}
            onPostDeleted={handlePostDeleted}
            onReactionToggled={fetchPosts}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
