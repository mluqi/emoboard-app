"use client";

import * as htmlToImage from "html-to-image";
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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Share2,
  Link as LinkIcon,
  Image as ImageIcon,
  Copy as CopyIcon,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";

const ShareButtons = ({ post, cardRef }) => {
  const [shareUrl, setShareUrl] = React.useState("");
  const [isGenerating, setIsGenerating] = React.useState(false);

  React.useEffect(() => {
    // Pastikan `window` tersedia (hanya di sisi klien)
    setShareUrl(window.location.origin + `/post/${post.post_id}`);
  }, [post.post_id]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl).then(
      () => {
        toast.success("Link copied to clipboard!");
      },
      (err) => {
        toast.error("Failed to copy link.");
        console.error("Failed to copy link: ", err);
      }
    );
  };

  // Helper untuk mempersiapkan kartu sebelum di-capture
  const prepareCardForCapture = (cardElement) => {
    // Membuat elemen watermark
    const watermark = document.createElement("div");
    watermark.style.position = "absolute";
    watermark.style.bottom = "1rem";
    watermark.style.right = "1.5rem";
    watermark.style.opacity = "0.6";
    watermark.style.display = "flex";
    watermark.style.alignItems = "center";
    watermark.style.gap = "0.5rem";
    // Mengambil warna teks dari CSS variable agar sesuai dengan tema (terang/gelap)
    const foregroundColor = getComputedStyle(document.documentElement)
      .getPropertyValue("--foreground")
      .trim();
    watermark.style.color = `hsl(${foregroundColor})`;
    watermark.style.fontSize = "14px";
    watermark.style.fontWeight = "600";
    watermark.innerHTML = `<img src="/logo.png" alt="EmoBoard Logo" style="width: 20px; height: 20px;" /><span>EmoBoard</span>`;

    const buttonsToHide = cardElement.querySelectorAll(
      ".ml-auto, .flex.items-center.gap-2.w-full"
    );
    buttonsToHide.forEach((el) => (el.style.visibility = "hidden"));
    cardElement.appendChild(watermark);

    // Mengembalikan fungsi untuk membersihkan DOM setelah selesai
    return () => {
      buttonsToHide.forEach((el) => (el.style.visibility = "visible"));
      if (cardElement.contains(watermark)) {
        cardElement.removeChild(watermark);
      }
    };
  };

  const handleDownloadImage = async () => {
    if (!cardRef.current) {
      toast.error("Cannot generate image. Component not found.");
      return;
    }
    setIsGenerating(true);
    toast.info("Generating image for download...");
    const cleanup = prepareCardForCapture(cardRef.current);
    try {
      const dataUrl = await htmlToImage.toJpeg(cardRef.current, {
        quality: 0.95,
        backgroundColor: getComputedStyle(cardRef.current).backgroundColor,
        pixelRatio: 5, // Resolusi lebih tinggi untuk kualitas lebih baik
      });

      const link = document.createElement("a");
      link.download = `emoboard-${post.post_id}.jpeg`;
      link.href = dataUrl;
      link.click();
      toast.success("Image downloaded!");
    } catch (error) {
      toast.error("Failed to generate image.");
      console.error("Failed to generate image:", error);
    } finally {
      cleanup();
      setIsGenerating(false);
    }
  };

  const handleCopyImage = async () => {
    if (!navigator.clipboard?.write) {
      toast.error("Your browser does not support copying images.");
      return;
    }
    if (!cardRef.current) {
      toast.error("Cannot generate image. Component not found.");
      return;
    }
    setIsGenerating(true);
    toast.info("Generating image to copy...");
    const cleanup = prepareCardForCapture(cardRef.current);
    try {
      const blob = await htmlToImage.toBlob(cardRef.current, {
        backgroundColor: getComputedStyle(cardRef.current).backgroundColor,
        pixelRatio: 2,
      });
      await navigator.clipboard.write([
        new ClipboardItem({ "image/png": blob }),
      ]);
      toast.success("Image copied to clipboard!");
    } catch (error) {
      toast.error("Failed to copy image.");
      console.error("Failed to copy image:", error);
    } finally {
      cleanup();
      setIsGenerating(false);
    }
  };

  if (!post || !shareUrl) return null;

  const title = post.title;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" disabled={isGenerating}>
          <Share2 className="mr-2 h-4 w-4" />
          Share
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onSelect={handleCopyLink} className="cursor-pointer">
          <LinkIcon className="mr-2 h-4 w-4" />
          <span>Copy Link</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={handleDownloadImage}
          disabled={isGenerating}
          className="cursor-pointer"
        >
          {isGenerating ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <ImageIcon className="mr-2 h-4 w-4" />
          )}
          <span>Download as Image</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={handleCopyImage}
          disabled={isGenerating}
          className="cursor-pointer"
        >
          {isGenerating ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <CopyIcon className="mr-2 h-4 w-4" />
          )}
          <span>Copy as Image</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />
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
