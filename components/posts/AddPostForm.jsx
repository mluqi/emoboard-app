"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import client from "@/api/client";
import { toast } from "sonner";
import useAuth from "@/hooks/useAuth";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const emotions = ["happy", "sad", "angry", "confused", "flat"];
const colorPalette = [
  "#f87171", // red-400
  "#fb923c", // orange-400
  "#facc15", // yellow-400
  "#4ade80", // green-400
  "#38bdf8", // lightBlue-400
  "#818cf8", // indigo-400
  "#c084fc", // purple-400
];

const AddPostForm = ({ onSuccess }) => {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [emotion, setEmotion] = useState("");
  const [colorTag, setColorTag] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      return toast.error("Title and content cannot be empty.");
    }
    if (!emotion) {
      return toast.error("Please select a feeling for your post.");
    }
    if (!colorTag) {
      return toast.error("Please select a color tag for your post.");
    }
    if (!user) {
      return toast.error("You must be logged in to create a post.");
    }

    setIsSubmitting(true);
    try {
      const { error } = await client.from("posts").insert({
        user_id: user.id,
        title: title.trim(),
        content: content.trim(),
        color_tag: colorTag,
        is_anonymous: isAnonymous,
        emotion: emotion,
      });

      if (error) throw error;

      toast.success("Post created successfully!");
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      toast.error(`Failed to create post: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          placeholder="A catchy title for your thought"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2 relative">
        <Label htmlFor="content">Content</Label>
        <Textarea
          name="content"
          placeholder="What's on your mind?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          disabled={isSubmitting}
          maxLength={1000}
        />
        <p className="absolute bottom-2 right-2 text-xs text-muted-foreground">
          {content.length} / 1000
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="space-y-2">
          <Label htmlFor="emotion">Feeling</Label>
          <Select onValueChange={setEmotion} value={emotion}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Select emotion" />
            </SelectTrigger>
            <SelectContent>
              {emotions.map((emo) => (
                <SelectItem key={emo} value={emo}>
                  {emo.charAt(0).toUpperCase() + emo.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="pt-2">
            <Label>Color Tag</Label>
            <div className="flex flex-wrap gap-2 pt-2">
              {colorPalette.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setColorTag(color === colorTag ? "" : color)}
                  className={cn(
                    "h-7 w-7 rounded-full border-2 transition-all",
                    colorTag === color
                      ? "border-primary ring-2 ring-primary/50 ring-offset-2 ring-offset-background"
                      : "border-muted hover:border-muted-foreground"
                  )}
                  style={{ backgroundColor: color }}
                  aria-label={`Select color ${color}`}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2 pt-2 sm:pt-8">
          <Switch
            id="anonymous"
            checked={isAnonymous}
            onCheckedChange={setIsAnonymous}
          />
          <Label htmlFor="anonymous">Post Anonymously</Label>
        </div>
      </div>
      <div className="flex justify-end">
        <Button type="submit" disabled={isSubmitting} className="w-24">
          {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Post"}
        </Button>
      </div>
    </form>
  );
};

export default AddPostForm;
