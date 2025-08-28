"use client";

import React from "react";
import Link from "next/link";
import { PlusSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/useAuth";
import client from "@/api/client";
import { useRouter } from "next/navigation";
import NotificationBell from "@/components/notifications/NotificationBell";
import { ThemeSwitcher } from "@/components/layout/ThemeSwitcher";

const Header = () => {
  const { user, profile } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await client.auth.signOut();
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-14 md:h-20 lg:h-20 mx-auto px-4 sm:px-6 justify-between items-center space-x-4 sm:justify-between sm:space-x-0">
        <Link href="/dashboard" className="flex space-x-2">
          <span className="font-bold text-2xl text-primary text-center sm:text-left">
            Emo<span className="text-gray-400">Board</span>
          </span>
        </Link>
        <div className="flex flex-1 items-center justify-end space-x-4 hidden md:flex sm:space-x-0 lg:space-x-4">
          <nav className="flex items-center space-x-2">
            <Button asChild>
              <Link href="/post/create">
                <PlusSquare className="mr-2 h-4 w-4" /> Create Post
              </Link>
            </Button>
            {user && profile && (
              <Button asChild variant="ghost">
                <Link href={`/profile/${profile.username}`}>My Profile</Link>
              </Button>
            )}
            <NotificationBell />
            <Button onClick={handleLogout} variant="outline">
              Logout
            </Button>
          </nav>
          <ThemeSwitcher />
        </div>
        <div className="flex items-center gap-2 md:hidden">
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
};

export default Header;
