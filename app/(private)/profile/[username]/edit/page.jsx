"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import client from "@/api/client";
import { toast } from "sonner";
import EmoBoardLoader from "@/components/common/EmoBoardLoader";
import BackButton from "@/components/common/BackButton";
import EditProfileForm from "@/components/profile/EditProfileForm";
import useAuth from "@/hooks/useAuth";

const EditProfilePage = () => {
  const { username } = useParams();
  const { user, loading: authLoading, fetchProfile } = useAuth();
  const router = useRouter();
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
          .maybeSingle();

        if (profileError) throw profileError;

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

  useEffect(() => {
    if (!authLoading && user && profile && user.id !== profile.id) {
      toast.error("You are not authorized to edit this profile.");
      router.push(`/profile/${username}`);
    }
  }, [user, profile, authLoading, router, username]);

  const handleProfileUpdated = async (newUsername) => {
    toast.success("Profile updated successfully!");
    await fetchProfile(user.id); // Refetch the profile for the header
    router.push(`/profile/${newUsername}`);
  };

  if (loading || authLoading || !profile) return <EmoBoardLoader />;
  if (error)
    return <div className="text-center text-destructive p-8">{error}</div>;

  return (
    <div className="flex min-h-screen flex-col items-center p-4 sm:p-8 md:p-12">
      <div className="w-full max-w-lg">
        <div className="mb-4">
          <BackButton>Back to Profile</BackButton>
        </div>
        <h1 className="text-3xl font-bold mb-6 text-center">Edit Profile</h1>
        <EditProfileForm
          profile={profile}
          onProfileUpdated={handleProfileUpdated}
        />
      </div>
    </div>
  );
};

export default EditProfilePage;
