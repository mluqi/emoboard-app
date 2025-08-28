"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import AddPostForm from "./AddPostForm";

const AddPostModal = ({ isOpen, onOpenChange, onPostCreated}) => {
  const router = useRouter();

  const handleSuccess = () => {
    onOpenChange(false);
    if (onPostCreated) {
      onPostCreated();
    } else {
      router.refresh(); // Fallback jika callback tidak disediakan
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Create a new Emo</DialogTitle>
          <DialogDescription>Share your thoughts with the community. Your post will appear on the feed.</DialogDescription>
        </DialogHeader>
        <AddPostForm onSuccess={handleSuccess} />
      </DialogContent>
    </Dialog>
  );
};

export default AddPostModal;
