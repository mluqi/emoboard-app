"use client";

import React, { useState } from "react";
import useAuth from "@/hooks/useAuth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AddPostModal from "./AddPostModal";

const AddPostSnippet = ({onPostCreated}) => {
  const { user, profile } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!user || !profile) {
    return null;
  }

  return (
    <>
      <div
        className="w-full max-w-2xl mx-auto mb-6 flex items-center gap-4 p-3 bg-card border rounded-lg cursor-pointer hover:bg-muted transition-colors"
        onClick={() => setIsModalOpen(true)}
      >
        <Avatar className="h-10 w-10 border">
          <AvatarImage src={profile.avatar_url} alt={profile.username} />
          <AvatarFallback>{profile.username?.[0].toUpperCase()}</AvatarFallback>
        </Avatar>
        <span className="text-muted-foreground">What's on your mind, {profile.username}?</span>
      </div>
      <AddPostModal isOpen={isModalOpen} onOpenChange={setIsModalOpen} onPostCreated={onPostCreated} />
    </>
  );
};

export default AddPostSnippet;
