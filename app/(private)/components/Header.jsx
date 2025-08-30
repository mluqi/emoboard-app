"use client";

import React from "react";
import Link from "next/link";
import { PlusSquare, User, LogOut, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/useAuth";
import client from "@/api/client";
import { useRouter, usePathname } from "next/navigation";
import NotificationBell from "@/components/notifications/NotificationBell";
import { ThemeSwitcher } from "@/components/layout/ThemeSwitcher";

const Header = () => {
  const { user, profile } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    await client.auth.signOut();
    router.push("/login");
  };

  // Jangan tampilkan header di halaman login/register
  if (pathname === "/login") {
    return null;
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container flex h-14 md:h-16 mx-auto px-4 justify-between items-center">
        {/* Desktop Navigation (Left) - Empty for centering */}
        <div className="hidden md:flex items-center gap-3 w-28 justify-start">
          {user && (
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="md:hidden lg:flex"
            >
              <Link href="/post/create">
                <PlusSquare className="h-4 w-4 mr-2" />
                Create
              </Link>
            </Button>
          )}
        </div>
        <div className="flex items-center gap-2 md:hidden">
          <ThemeSwitcher />
        </div>

        {/* Logo (Centered on all devices) */}
        <Link
          href="/"
          className="absolute left-1/2 transform -translate-x-1/2"
        >
          <span className="font-bold text-xl text-primary">
            Emo<span className="text-muted-foreground">Board</span>
          </span>
        </Link>

        {/* Desktop Navigation (Right) */}
        <div className="hidden md:flex items-center gap-1 justify-end">
          {user && profile && (
            <Button asChild variant="ghost" size="icon">
              <Link href={`/profile/${profile.username}`}>
                <User className="h-4 w-4" />
                <span className="sr-only">Profile</span>
              </Link>
            </Button>
          )}
          {user && (
            <Button asChild variant="ghost" size="icon">
              <Link href="/reacted">
                <Heart className="h-4 w-4" />
                <span className="sr-only">Reacted Posts</span>
              </Link>
            </Button>
          )}
          <NotificationBell />
          <ThemeSwitcher />
          <Button onClick={handleLogout} variant="ghost" size="icon">
            <LogOut className="h-4 w-4" />
            <span className="sr-only">Logout</span>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 md:hidden">
          <NotificationBell />
        </div>
      </div>
    </header>
  );
};

export default Header;
