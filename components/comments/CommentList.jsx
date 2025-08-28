import React, { useEffect, useState } from "react";
import client from "@/api/client";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useAuth from "@/hooks/useAuth";
import CommentSkeleton from "./CommentSkeleton";
import { formatPostDate } from "@/lib/dateUtils";
import { MoreHorizontal, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DeleteConfirmationDialog from "../common/DeleteConfirmationDialog";

const CommentList = ({ postId, refreshTrigger }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const handleCommentDeleted = (deletedCommentId) => {
    setComments((currentComments) => currentComments.filter((c) => c.comment_id !== deletedCommentId));
  };

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoading(true);
        const { data, error } = await client
          .from("comments")
          .select("*, profile:profiles(username, avatar_url)")
          .eq("post_id", postId)
          .order("created_at", { ascending: true });

        if (error) throw error;
        setComments(data);
      } catch (error) {
        toast.error("Failed to fetch comments: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [postId, refreshTrigger]);

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(2)].map((_, i) => <CommentSkeleton key={i} />)}
      </div>
    );
  }
  if (comments.length === 0)
    return <p className="text-sm text-muted-foreground">No comments yet.</p>;

  return (
    <div className="space-y-4">
      {comments.map((comment) => {
        const isAuthor = user && user.id === comment.user_id;
        const handleDelete = async () => {
          try {
            const { error } = await client.from("comments").delete().eq("comment_id", comment.comment_id);
            if (error) throw error;
            toast.success("Comment deleted.");
            handleCommentDeleted(comment.comment_id);
          } catch (error) {
            toast.error("Failed to delete comment: " + error.message);
          }
        };

        return (
          <div
            key={comment.comment_id}
            className="flex items-start gap-3 group"
          >
            <Avatar className="h-8 w-8 border">
              <AvatarImage src={!comment.is_anonymous ? comment.profile?.avatar_url : null} />
              <AvatarFallback>
                {!comment.is_anonymous ? comment.profile?.username?.[0].toUpperCase() : 'A'}
              </AvatarFallback>
            </Avatar>
            <div className="bg-muted p-3 rounded-lg w-full">
              <div className="flex items-center gap-2 mb-1">
                <p className="text-sm font-semibold">
                  {!comment.is_anonymous
                    ? comment.profile?.username || "User"
                    : "Anonymous"}
                </p>
                <p className="text-xs text-muted-foreground">
                  {formatPostDate(comment.created_at)}
                </p>
              </div>
              <p className="text-sm whitespace-pre-wrap">{comment.content}</p>
            </div>
            {isAuthor && (
              <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <MoreHorizontal className="h-3.5 w-3.5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DeleteConfirmationDialog onConfirm={handleDelete} itemType="comment">
                      <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-destructive focus:bg-destructive/10 focus:text-destructive">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DeleteConfirmationDialog>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CommentList;
