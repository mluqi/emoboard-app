"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const PostFilters = ({
  sortOption,
  moodOption,
  onSortChange,
  onMoodChange,
}) => {
  const moods = ["happy", "angry", "sad", "confused", "flat"];

  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-4">
      <div className="flex-1">
        <Select value={sortOption} onValueChange={onSortChange}>
          <SelectTrigger className="bg-muted/50 border-none shadow-none text-sm py-2 h-9">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent className="bg-muted/80 backdrop-blur-sm border-none">
            <SelectItem value="latest" className="text-sm focus:bg-muted">Latest</SelectItem>
            <SelectItem value="popular" className="text-sm focus:bg-muted">
              Most Popular (Comments)
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex-1">
        <Select value={moodOption} onValueChange={onMoodChange}>
          <SelectTrigger className="bg-muted/50 border-none shadow-none text-sm py-2 h-9">
            <SelectValue placeholder="Filter by mood" />
          </SelectTrigger>
          <SelectContent className="bg-muted/80 backdrop-blur-sm border-none">
            <SelectItem value="all" className="text-sm focus:bg-muted">All Moods</SelectItem>
            {moods.map((mood) => (
              <SelectItem key={mood} value={mood} className="text-sm capitalize focus:bg-muted">
                {mood}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default PostFilters;