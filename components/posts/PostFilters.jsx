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
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="flex-1">
        <label className="text-sm font-medium text-muted-foreground">
          Sort by
        </label>
        <Select value={sortOption} onValueChange={onSortChange}>
          <SelectTrigger>
            <SelectValue placeholder="Sort posts" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="latest">Latest</SelectItem>
            <SelectItem value="popular">Most Popular (Comments)</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex-1">
        <label className="text-sm font-medium text-muted-foreground">
          Filter by Mood
        </label>
        <Select value={moodOption} onValueChange={onMoodChange}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by mood" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Moods</SelectItem>
            {moods.map((mood) => (
              <SelectItem key={mood} value={mood} className="capitalize">
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
