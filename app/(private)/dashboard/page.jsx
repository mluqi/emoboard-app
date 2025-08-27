"use client";

import React, { useEffect } from "react";
import PostList from "@/components/posts/PostList";

const DashboardPage = () => {

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
        <h1 className="text-3xl font-bold mb-6">Home Feed</h1>
        <PostList />
      </div>
    </div>
  );
};

export default DashboardPage;
