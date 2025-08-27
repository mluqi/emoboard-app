"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, PlusSquare, User, Bell } from "lucide-react";
import useAuth from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

const MobileBottomNavbar = () => {
  const pathname = usePathname();
    const { profile, notifications } = useAuth();
  const unreadCount = notifications.filter((n) => !n.is_read).length;


  if (!profile) return null;

  const navLinks = [
    { href: "/dashboard", icon: Home, label: "Home" },
    { href: "/post/create", icon: PlusSquare, label: "Add Emo" },
    { href: "/notifications", icon: Bell, label: "Notifications" },
    { href: `/profile/${profile.username}`, icon: User, label: "Profile" },
  ];

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-background border-t md:hidden">
      <div className="grid h-full max-w-lg grid-cols-4 mx-auto">
        {navLinks.map(({ href, icon: Icon, label }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              "inline-flex flex-col items-center justify-center px-5 font-medium hover:bg-accent group",
              pathname === href ? "text-primary" : "text-muted-foreground"
            )}
          >
            <div className="relative pt-1">
              <Icon className="w-6 h-6 mb-1" />
              {label === "Notifications" && unreadCount > 0 && (
                <span className="absolute top-0 right-0 flex h-4 w-4 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              )}
            </div>
            <span className="text-xs">{label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MobileBottomNavbar;
