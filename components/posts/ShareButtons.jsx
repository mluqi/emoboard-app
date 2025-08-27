"use client";

import React from "react";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  TelegramShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  TelegramIcon,
} from "react-share";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";

const ShareButtons = ({ post }) => {
  const [shareUrl, setShareUrl] = React.useState("");

  React.useEffect(() => {
    // Pastikan `window` tersedia (hanya di sisi klien)
    setShareUrl(window.location.origin + `/post/${post.post_id}`);
  }, [post.post_id]);

  if (!post || !shareUrl) return null;

  const title = post.title;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          <Share2 className="mr-2 h-4 w-4" />
          Share
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <FacebookShareButton
            url={shareUrl}
            quote={title}
            className="flex items-center gap-2 w-full"
          >
            <FacebookIcon size={24} round />
            <span>Facebook</span>
          </FacebookShareButton>
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <TwitterShareButton
            url={shareUrl}
            title={title}
            className="flex items-center gap-2 w-full"
          >
            <TwitterIcon size={24} round />
            <span>Twitter</span>
          </TwitterShareButton>
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <WhatsappShareButton
            url={shareUrl}
            title={title}
            separator=":: "
            className="flex items-center gap-2 w-full"
          >
            <WhatsappIcon size={24} round />
            <span>WhatsApp</span>
          </WhatsappShareButton>
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <TelegramShareButton
            url={shareUrl}
            title={title}
            className="flex items-center gap-2 w-full"
          >
            <TelegramIcon size={24} round />
            <span>Telegram</span>
          </TelegramShareButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ShareButtons;
