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
import client from "@/api/client";
import useAuth from "@/hooks/useAuth";

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
        .insert([{ 
          title, 
          content, 
          emotion, 
          color_tag: colorTag, 
          user_id: user.id, 
          is_anonymous: isAnonymous 
        }])
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
      className="w-full max-w-2xl mb-8 p-4 border rounded-lg space-y-4"
    >
      <Input
        name="title"
        placeholder="Title"
        className="font-bold text-lg"
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
        />
        <p className="absolute bottom-2 right-2 text-xs text-muted-foreground">
          {content.length} / 1000
        </p>
      </div>
      <div className="flex items-center gap-4">
        <Select name="emotion" value={emotion} onValueChange={setEmotion} disabled={isSubmitting}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Emotion" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="happy">Happy</SelectItem>
            <SelectItem value="angry">Angry</SelectItem>
            <SelectItem value="sad">Sad</SelectItem>
            <SelectItem value="confused">Confused</SelectItem>
            <SelectItem value="flat">Flat</SelectItem>
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
      <div className="flex items-center space-x-2 pt-2">
        <Checkbox id="is_anonymous" name="is_anonymous" checked={isAnonymous} onCheckedChange={setIsAnonymous} disabled={isSubmitting} />
        <Label
          htmlFor="is_anonymous"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-50"
        >
          Post anonymously
        </Label>
      </div>
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Posting..." : "Post"}
      </Button>
    </form>
  );
};

export default CreatePost;
