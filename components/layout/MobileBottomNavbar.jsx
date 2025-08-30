"use client";

import React, { Fragment } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, PlusSquare, User, Bell, LogIn, SmileIcon } from "lucide-react";
import useAuth from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

const MobileBottomNavbar = () => {
  const pathname = usePathname();
  const { user, profile, notifications } = useAuth();
  const unreadCount = notifications.filter((n) => !n.is_read).length;

  const navLinks = user && profile
    ? [
        { href: "/", icon: Home, label: "Home" },
        { href: "/post/create", icon: PlusSquare, label: "Post" },
        // { href: "/notifications", icon: Bell, label: "Notifications" },
        { href: "/reacted", icon: SmileIcon, label: "Reacted" },
        { href: `/profile/${profile.username}`, icon: User, label: "Profile" },
      ]
    : [
        { href: "/", icon: Home, label: "Home" },
        { href: "/login", icon: LogIn, label: "Login" },
      ];

  // Jangan tampilkan navbar di halaman login/register
  if (pathname === '/login') {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full h-14 bg-background/90 backdrop-blur-md border-t md:hidden">
      <div className="flex h-full justify-around items-center px-2">
        {navLinks.map(({ href, icon: Icon, label }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              "inline-flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-colors",
              pathname === href
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            )} 
          >
            <div className="relative">
              {label === "Profile" && profile?.avatar_url ? (
                <img
                  src={profile.avatar_url}
                  alt="Profile"
                  className="w-5 h-5 rounded-full object-cover"
                />
              ) : (
                <Icon className="w-5 h-5" />
              )}
              {label === "Notifications" && unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              )}
            </div>
            {/* <span className="text-xs mt-1">{label}</span> */}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MobileBottomNavbar;