"use client";

import React, { useEffect } from "react";
import useAuth from "@/hooks/useAuth";
import BackButton from "@/components/common/BackButton";
import EmoBoardLoader from "@/components/common/EmoBoardLoader";
import NotificationItem from "@/components/notifications/NotificationItem";
import client from "@/api/client";

const NotificationsPage = () => {
  const { notifications, loading, user, fetchNotifications } = useAuth();
  const unreadCount = notifications.filter((n) => !n.is_read).length;

  useEffect(() => {
    // Mark all as read when the page is viewed
    const markAllAsRead = async () => {
      if (unreadCount > 0 && user) {
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

    markAllAsRead();
  }, [user, unreadCount, fetchNotifications]);

  if (loading) return <EmoBoardLoader />;

  return (
    <div className="flex min-h-screen flex-col items-center p-4 sm:p-8 md:p-12">
      <div className="w-full max-w-2xl">
        <div className="mb-4">
          <BackButton />
        </div>
        <h1 className="text-3xl font-bold mb-6">Notifications</h1>
        <div className="space-y-2 rounded-lg border p-2">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
              />
            ))
          ) : (
            <p className="text-center text-sm text-muted-foreground p-4">
              You have no notifications.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;
