import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import client from "@/api/client";
import useAuth from "@/hooks/useAuth";

const CreateComment = ({ postId, onCommentAdded }) => {
  const { user } = useAuth();
  const [content, setContent] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!content.trim()) return;
    setIsSubmitting(true);
    try {
      const { error } = await client
        .from("comments")
        .insert([
          { content, post_id: postId, user_id: user.id, is_anonymous: isAnonymous },
        ]);

      if (error) throw error;

      e.target.reset();
      setContent("");
      setIsAnonymous(false);
      if (onCommentAdded) onCommentAdded();
    } catch (error) {
      toast.error("Failed to post comment: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-2">
      <div className="flex items-start gap-2">
        <Textarea
          name="content"
          placeholder="Write a comment..."
          rows={1}
          className="resize-none"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          disabled={isSubmitting}
        />
        <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "..." : "Send"}</Button>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id={`is_anonymous_comment_${postId}`}
          name="is_anonymous"
          checked={isAnonymous}
          onCheckedChange={setIsAnonymous}
          disabled={isSubmitting}
        />
        <Label htmlFor={`is_anonymous_comment_${postId}`} className="text-xs text-muted-foreground" >
          Comment anonymously
        </Label>
      </div>
    </form>
  );
};

export default CreateComment;
