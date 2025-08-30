"use client";

import React from "react";
import { Bell } from "lucide-react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import useAuth from "@/hooks/useAuth";
import NotificationItem from "./NotificationItem";
import client from "@/api/client";
import Link from "next/link";

const NotificationBell = () => {
  const pathname = usePathname();
  const { notifications, fetchNotifications, user } = useAuth();
  const unreadCount = notifications.filter((n) => !n.is_read).length;

  const isNotificationsPage = pathname === "/notifications";

  const handleOpenChange = async (open) => {
    if (isNotificationsPage) return;
    if (open && unreadCount > 0) {
      // Mark all as read
      const { error } = await client
        .from("notifications")
        .update({ is_read: true })
        .eq("user_id", user.id)
        .eq("is_read", false);

      if (error) {
        console.error("Failed to mark notifications as read", error);
      } else {
        fetchNotifications(user.id);
      }
    }
  };

  return (
    <Popover onOpenChange={handleOpenChange} >
      <PopoverTrigger asChild disabled={isNotificationsPage}>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
              {unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-2">
        <div className="font-semibold p-2">Notifications</div>
        <div className="max-h-96 overflow-y-auto">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
              />
            ))
          ) : (
            <p className="text-center text-sm text-muted-foreground p-4">
              No notifications yet.
            </p>
          )}
        </div>
        <Link
          href="/notifications"
          className="flex justify-end p-2 text-sm text-primary/80 hover:text-primary"
        >
          see all notifications
        </Link>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationBell;
