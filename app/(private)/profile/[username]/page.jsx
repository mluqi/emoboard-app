"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import client from "@/api/client";
import { toast } from "sonner";
import Loader from "@/components/ui/Loader";
import PostList from "@/components/posts/PostList";
import ProfileHeader from "@/components/profile/ProfileHeader";

const ProfilePage = () => {
  const { username } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
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

  if (loading) return <Loader />;
  if (error)
    return <div className="text-center text-destructive p-8">{error}</div>;
  if (!profile)
    return <div className="text-center p-8">Profile not found.</div>;

  return (
    <div className="flex min-h-screen flex-col items-center p-4 sm:p-8 md:p-12">
      <div className="w-full max-w-2xl">
        <ProfileHeader profile={profile} />
        <div className="mt-8 border-t pt-8">
          <h2 className="text-2xl font-bold mb-6">
            Posts by {profile.username}
          </h2>
          <PostList userId={profile.id} />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
