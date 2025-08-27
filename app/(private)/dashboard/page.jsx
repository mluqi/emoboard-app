"use client";

import React, { useEffect, useState } from "react";
import PostList from "@/components/posts/PostList";
import PostFilters from "@/components/posts/PostFilters";

const DashboardPage = () => {
  const [sortOption, setSortOption] = useState('latest');
  const [moodOption, setMoodOption] = useState('all');

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
        <PostFilters
          sortOption={sortOption}
          moodOption={moodOption}
          onSortChange={setSortOption}
          onMoodChange={setMoodOption}
        />
        <PostList sortOption={sortOption} moodOption={moodOption} />
      </div>
    </div>
  );
};

export default DashboardPage;
