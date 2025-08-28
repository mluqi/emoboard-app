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

const emotions = ["happy", "sad", "angry", "confused", "flat"];

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
        emotion: emotion || null,
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
      <div className="space-y-2">
        <Label htmlFor="content">Content</Label>
        <Textarea
          id="content"
          placeholder="What's on your mind?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          rows={6}
        />
      </div>
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="space-y-2">
          <Label htmlFor="emotion">Feeling (Optional)</Label>
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
          <Input
            name="color_tag"
            placeholder="Color Tag (e.g., #ff0000)"
            value={colorTag}
            onChange={(e) => setColorTag(e.target.value)}
            disabled={isSubmitting}
          />
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
