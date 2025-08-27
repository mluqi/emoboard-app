import React from "react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const NotificationItem = ({ notification }) => {
  const { actor, type, post, is_read } = notification;

  const notificationText = {
    new_comment: "commented on your post:",
    new_reaction: "reacted to your post:",
  };

  return (
    <Link href={`/dashboard#${post.post_id}`} className="block">
      <div
        className={cn(
          "p-3 flex items-center gap-3 hover:bg-accent/50 rounded-md",
          !is_read && "bg-primary/10"
        )}
      >
        <Avatar className="h-9 w-9 border">
          <AvatarImage src={actor?.avatar_url} />
          <AvatarFallback>
            {actor?.username?.[0].toUpperCase() || "S"}
          </AvatarFallback>
        </Avatar>
        <div className="text-sm overflow-hidden">
          <p>
            <span className="font-semibold">
              {actor?.username || "Someone"}
            </span>{" "}
            {notificationText[type] || "interacted with your post."}
          </p>
          <p className="text-muted-foreground truncate">"{post.title}"</p>
        </div>
      </div>
    </Link>
  );
};

export default NotificationItem;
