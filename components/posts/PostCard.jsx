import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Eye, MessageSquare, MoreHorizontal, Trash2 } from "lucide-react";
import CommentSection from "../comments/CommentSection";
import ReactionButtons from "./ReactionButtons";
import ShareButtons from "./ShareButtons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useAuth from "@/hooks/useAuth";
import client from "@/api/client";
import { toast } from "sonner";
import DeleteConfirmationDialog from "../common/DeleteConfirmationDialog";

const PostCard = ({ post, onPostDeleted, isDetailPage = false }) => {
  const {
    post_id,
    title,
    content,
    created_at,
    profile,
    emotion,
    color_tag,
    is_anonymous,
    comments,
    view_count,
  } = post;
  const { user } = useAuth();
  const [isExpanded, setIsExpanded] = useState(isDetailPage);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const postDate = new Date(created_at).toLocaleString();
  const isAuthor = user && user.id === post.user_id;
  const commentCount = comments[0]?.count || 0;

  useEffect(() => {
    // Panggil fungsi RPC untuk menaikkan view count saat komponen post ditampilkan.
    // Ini adalah cara sederhana untuk melacak tayangan.
    if (user) {
      const recordView = async () => {
        await client.rpc("record_post_view", {
          post_id_to_view: post_id,
        });
      };

      recordView();
    }
  }, [post_id, user]);

  const handleDelete = async () => {
    try {
      const { error } = await client
        .from("posts")
        .delete()
        .eq("post_id", post_id);
      if (error) throw error;
      toast.success("Post deleted successfully.");
      if (onPostDeleted) {
        onPostDeleted(post_id);
      }
    } catch (error) {
      toast.error("Failed to delete post: " + error.message);
    }
  };

  const PostAuthor = () => {
    if (is_anonymous) {
      return (
        <div className="flex items-center gap-4">
          <Avatar className="h-10 w-10 border">
            <AvatarFallback>A</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-semibold leading-none">Anonymous</p>
            <p className="text-xs text-muted-foreground">{postDate}</p>
          </div>
        </div>
      );
    }

    return (
      <Link
        href={`/profile/${profile?.username}`}
        className="flex items-center gap-4 hover:opacity-80 transition-opacity"
      >
        <Avatar className="h-10 w-10 border">
          <AvatarImage src={profile?.avatar_url} />
          <AvatarFallback>
            {profile?.username?.[0].toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm font-semibold leading-none">
            {profile?.username || "User"}
          </p>
          <p className="text-xs text-muted-foreground">{postDate}</p>
        </div>
      </Link>
    );
  };

  const ContentWrapper = ({ children }) => {
    if (isDetailPage) {
      return <div>{children}</div>;
    }
    return <Link href={`/post/${post_id}`}>{children}</Link>;
  };

  const contentBody = (
    <CardContent>
      <CardTitle className="mb-2">{title}</CardTitle>
      <p className="whitespace-pre-wrap">
        {content.length > 480 && !isExpanded
          ? `${content.substring(0, 480)}...`
          : content}
      </p>
      {content.length > 480 && !isDetailPage && (
        <Button
          variant="link"
          className="p-0 h-auto mt-2 text-primary"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsExpanded(!isExpanded);
          }}
        >
          {isExpanded ? "Show less" : "Read more"}
        </Button>
      )}
      {emotion && (
        <p className="text-xs text-muted-foreground mt-4">Feeling: {emotion}</p>
      )}
    </CardContent>
  );

  return (
    <Card
      id={post_id}
      style={{ borderLeft: `4px solid ${color_tag || "transparent"}` }}
      className="scroll-mt-20"
    >
      <CardHeader className="flex flex-row items-center gap-4 pb-4">
        <PostAuthor />
        <div className="ml-auto">
          {isAuthor && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DeleteConfirmationDialog
                  onConfirm={handleDelete}
                  itemType="post"
                >
                  <DropdownMenuItem
                    onSelect={(e) => e.preventDefault()}
                    className="text-destructive focus:bg-destructive/10 focus:text-destructive"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DeleteConfirmationDialog>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </CardHeader>
      <ContentWrapper>{contentBody}</ContentWrapper>
      <CardFooter className="flex flex-col sm:flex-row justify-between items-center gap-4 border-t pt-4 pb-2">
        <div className="flex items-center gap-1 text-muted-foreground text-sm w-full">
          <ReactionButtons postId={post_id} />
          <div className="flex items-center gap-1.5 sm:ml-auto">
            <Eye className="h-4 w-4" />
            <span>{view_count}</span>
          </div>
        </div>
        <div className="flex items-center gap-2 w-full">
          <ShareButtons post={post} />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCommentsOpen(!commentsOpen)}
            className="flex-1 justify-center w-full"
          >
            <MessageSquare className="mr-2 h-4 w-4" />
            {commentCount} Comments
          </Button>
        </div>
      </CardFooter>
      {commentsOpen && <CommentSection postId={post_id} />}
    </Card>
  );
};

export default PostCard;
