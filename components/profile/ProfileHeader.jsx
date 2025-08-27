import React from "react";
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

const ProfileHeader = ({ profile }) => {
  const { user } = useAuth();
  const isOwner = user && user.id === profile.id;

  if (!profile) return null;

  return (
    <Card>
      <CardHeader className="items-center text-center gap-2">
        <Avatar className="h-24 w-24 border-2 mb-4">
          <AvatarImage src={profile.avatar_url} alt={profile.username} />
          <AvatarFallback className="text-3xl">
            {profile.username?.[0].toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <CardTitle className="text-3xl">
          {profile.full_name || profile.username}
        </CardTitle>
        <CardDescription>@{profile.username}</CardDescription>
        {isOwner && (
          <Button asChild variant="outline" size="sm" className="mt-2">
            <Link href={`/profile/${profile.username}/edit`}>Edit Profile</Link>
          </Button>
        )}
      </CardHeader>
    </Card>
  );
};

export default ProfileHeader;
