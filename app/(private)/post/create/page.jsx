"use client";

import React from "react";
import BackButton from "@/components/common/BackButton";
import { useRouter } from "next/navigation";
import CreatePost from "@/components/posts/CreatePost";

const CreatePostPage = () => {
  const router = useRouter();

  const handlePostCreated = () => {
    router.push("/dashboard");
  };

  return (
    <div className="flex min-h-screen flex-col items-center p-4 sm:p-8 md:p-12">
      <div className="w-full max-w-2xl">
        <div className="mb-4">
          <BackButton />
        </div>
        <h1 className="text-3xl font-bold mb-6">Create a New Emo</h1>
        <CreatePost onPostCreated={handlePostCreated} />
      </div>
    </div>
  );
};

export default CreatePostPage;
