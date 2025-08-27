'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import client from '@/api/client';
import { toast } from 'sonner';
import useAuth from '@/hooks/useAuth';

const EditProfileForm = ({ profile, onProfileUpdated }) => {
  const { user } = useAuth();
  const [fullName, setFullName] = useState(profile.full_name || '');
  const [username, setUsername] = useState(profile.username || '');
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(profile.avatar_url || null);
  const [uploading, setUploading] = useState(false);

  const handleAvatarChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    try {
      let avatar_url = profile.avatar_url;

      if (avatarFile) {
        const fileExt = avatarFile.name.split('.').pop();
        const fileName = `${user.id}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await client.storage
          .from('avatars')
          .upload(filePath, avatarFile, {
            cacheControl: '3600',
            upsert: true,
          });

        if (uploadError) throw uploadError;

        const { data: urlData } = client.storage.from('avatars').getPublicUrl(filePath);
        avatar_url = `${urlData.publicUrl}?t=${new Date().getTime()}`; // bust cache
      }

      const updates = {
        id: user.id,
        username,
        full_name: fullName,
        avatar_url,
        updated_at: new Date(),
      };

      const { error: profileError } = await client.from('profiles').upsert(updates);

      if (profileError) throw profileError;

      onProfileUpdated(username);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <CardHeader className="items-center">
          <Avatar className="h-24 w-24 border-2 mb-4">
            <AvatarImage src={avatarPreview} alt={username} />
            <AvatarFallback>{username?.[0].toUpperCase()}</AvatarFallback>
          </Avatar>
          <Label htmlFor="avatar" className="cursor-pointer text-sm text-primary hover:underline">Change Avatar</Label>
          <Input id="avatar" type="file" onChange={handleAvatarChange} accept="image/*" disabled={uploading} className="hidden" />
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input id="username" value={username} onChange={(e) => setUsername(e.target.value)} required disabled={uploading} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} disabled={uploading} />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={uploading} className="w-full">
            {uploading ? 'Saving...' : 'Save Changes'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default EditProfileForm;
