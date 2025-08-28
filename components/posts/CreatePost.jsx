import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

import client from "@/api/client";
import useAuth from "@/hooks/useAuth";

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

const CreatePost = ({ onPostCreated }) => {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [emotion, setEmotion] = useState("happy");
  const [colorTag, setColorTag] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast.error("Title and content cannot be empty.");
      return;
    }
    setIsSubmitting(true);
    try {
      const { data, error } = await client
        .from("posts")
        .insert([
          {
            title,
            content,
            emotion,
            color_tag: colorTag,
            user_id: user.id,
            is_anonymous: isAnonymous,
          },
        ])
        .select();

      if (error) throw error;

      toast.success("Post created successfully!");
      e.target.reset();
      if (onPostCreated) {
        onPostCreated();
      }
      // Reset form state
      setTitle("");
      setContent("");
      setEmotion("happy");
      setColorTag("");
      setIsAnonymous(false);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-2xl mb-6 p-6 bg-background/50 backdrop-blur-sm rounded-lg space-y-5 border"
    >
      <Input
        name="title"
        placeholder="Title"
        className="text-lg font-medium border-none shadow-none focus-visible:ring-0 px-0 rounded-none border-b"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        disabled={isSubmitting}
      />

      <div className="relative">
        <Textarea
          name="content"
          placeholder="What's on your mind?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          disabled={isSubmitting}
          maxLength={1000}
          className="min-h-[120px] resize-none border-none shadow-none focus-visible:ring-0 px-0 rounded-none border-b"
        />
        <p className="absolute bottom-1 right-1 text-xs text-muted-foreground bg-background/80 px-2 py-1 rounded-full">
          {content.length} / 1000
        </p>
      </div>

      <div className="flex flex-col gap-4 pt-2">
        <div className="flex items-center gap-4">
          <Select
            name="emotion"
            value={emotion}
            onValueChange={setEmotion}
            disabled={isSubmitting}
          >
            <SelectTrigger className="w-[140px] border-none bg-muted/50 shadow-none">
              <SelectValue placeholder="Emotion" />
            </SelectTrigger>
            <SelectContent>
              {emotions.map((emo) => (
                <SelectItem key={emo} value={emo} className="capitalize">
                  {emo}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex flex-wrap gap-1">
            {colorPalette.map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => setColorTag(color === colorTag ? "" : color)}
                className={cn(
                  "h-6 w-6 rounded-full transition-all hover:scale-110",
                  colorTag === color
                    ? "ring-2 ring-offset-2 ring-primary ring-offset-background"
                    : "opacity-70 hover:opacity-100"
                )}
                style={{ backgroundColor: color }}
                aria-label={`Select color ${color}`}
              />
            ))}
          </div>
        </div>

        <Input
          name="color_tag"
          placeholder="Or enter custom color (e.g., #ff0000)"
          value={colorTag}
          onChange={(e) => setColorTag(e.target.value)}
          disabled={isSubmitting}
          className="text-sm border-none bg-muted/50 shadow-none"
        />
      </div>

      <div className="flex items-center space-x-3 pt-2">
        <Checkbox
          id="is_anonymous"
          name="is_anonymous"
          checked={isAnonymous}
          onCheckedChange={setIsAnonymous}
          disabled={isSubmitting}
          className="border-muted-foreground/30 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
        />
        <Label
          htmlFor="is_anonymous"
          className="text-sm font-normal text-muted-foreground cursor-pointer"
        >
          Post anonymously
        </Label>
      </div>

      <Button
        type="submit"
        className="w-full bg-primary hover:bg-primary/90 transition-colors"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Posting..." : "Post"}
      </Button>
    </form>
  );
};

export default CreatePost;
