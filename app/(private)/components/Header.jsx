"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PlusSquare, Menu, X, User, LogOut, Heart, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/useAuth";
import client from "@/api/client";
import { useRouter, usePathname } from "next/navigation";
import NotificationBell from "@/components/notifications/NotificationBell";
import { ThemeSwitcher } from "@/components/layout/ThemeSwitcher";

const Header = () => {
  const { user, profile } = useAuth();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const handleLogout = async () => {
    await client.auth.signOut();
    router.push("/");
    setIsMobileMenuOpen(false);
  };

  // Jangan tampilkan header di halaman login/register
  if (pathname === "/" || pathname === "/") {
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

        {/* Logo (Centered on all devices) */}
        <Link
          href="/dashboard"
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
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2"
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu - Minimalis */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background/90 backdrop-blur-lg">
          <div className="mx-auto px-4 py-2 flex flex-col gap-1">
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="justify-start px-3 py-2 h-9 font-normal"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Link href="/dashboard">
                <Home className="h-4 w-4 mr-2" />
                Home
              </Link>
            </Button>

            <Button
              asChild
              variant="ghost"
              size="sm"
              className="justify-start px-3 py-2 h-9 font-normal"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Link href="/post/create">
                <PlusSquare className="h-4 w-4 mr-2" />
                Create Post
              </Link>
            </Button>

            {user && profile && (
              <div>
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className="justify-start px-3 py-2 h-9 font-normal"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Link href={`/profile/${profile.username}`}>
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className="justify-start px-3 py-2 h-9 font-normal"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Link href="/reacted">
                    <Heart className="h-4 w-4 mr-2" />
                    Reacted Posts
                  </Link>
                </Button>
              </div>
            )}

            <div className="flex items-center justify-between px-3 py-2 mt-1">
              <span className="text-sm text-muted-foreground">Theme</span>
              <ThemeSwitcher />
            </div>

            <Button
              onClick={handleLogout}
              variant="ghost"
              size="sm"
              className="justify-start px-3 py-2 h-9 font-normal text-red-500 hover:text-red-600 hover:bg-red-500/10"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
