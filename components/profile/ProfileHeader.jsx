import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import useAuth from "@/hooks/useAuth";
import Link from "next/link";
import { Button } from "../ui/button";
import client from "@/api/client";
import { useRouter } from "next/navigation";
import { Settings, LogOut, User, Edit } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const ProfileHeader = ({ profile }) => {
  const { user } = useAuth();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const isOwner = user && user.id === profile.id;

  if (!profile) return null;

  const handleLogout = async () => {
    await client.auth.signOut();
    router.push("/login");
    setIsOpen(false);
  };

  return (
    <Card className="border-none bg-card shadow-md relative">
      <CardHeader className="flex flex-col items-center text-center gap-1 p-4">
        {/* Settings Dropdown */}
        {isOwner && (
          <div className="absolute top-3 right-3">
            <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full"
                >
                  <Settings className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem asChild>
                  <Link
                    href={`/profile/${profile.username}/edit`}
                    className="flex items-center cursor-pointer"
                    onClick={() => setIsOpen(false)}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="flex items-center cursor-pointer text-red-600 focus:text-red-600"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}

        <Avatar className="h-20 w-20 mb-3">
          <AvatarImage src={profile.avatar_url} alt={profile.username} />
          <AvatarFallback className="text-2xl bg-muted/50">
            {profile.username?.[0]?.toUpperCase() || "U"}
          </AvatarFallback>
        </Avatar>
        <CardTitle className="text-2xl font-semibold">
          {profile.full_name || profile.username}
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          @{profile.username}
        </CardDescription>
      </CardHeader>
    </Card>
  );
};

export default ProfileHeader;
