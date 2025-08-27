"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import client from "@/api/client";
import { toast } from "sonner";
import Loader from "@/components/ui/Loader";
import PostCard from "@/components/posts/PostCard";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const PostDetailPage = () => {
  const { post_id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!post_id) return;

    const fetchPost = async () => {
      try {
        setLoading(true);
        // Menggunakan fungsi RPC yang sudah ada untuk efisiensi
        const { data, error: postError } = await client
          .rpc("get_posts", {
            p_user_id: null,
            p_sort_by: "latest",
            p_mood: null,
          })
          .eq("post_id", post_id)
          .single();

        if (postError) throw postError;

        if (data) {
          // Adaptasi struktur data agar sesuai dengan yang diharapkan PostCard
          const formattedPost = {
            ...data,
            comments: [{ count: data.comment_count }],
          };
          setPost(formattedPost);
        } else {
          setError("Post not found.");
        }
      } catch (err) {
        setError(err.message);
        toast.error("Failed to fetch post: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [post_id]);

  if (loading) return <Loader />;
  if (error)
    return <div className="text-center text-destructive p-8">{error}</div>;
  if (!post) return <div className="text-center p-8">Post not found.</div>;

  return (
    <div className="flex min-h-screen flex-col items-center p-4 sm:p-8 md:p-12">
      <div className="w-full max-w-2xl">
        <div className="mb-4">
          <Button asChild variant="outline" size="sm">
            <Link href="/dashboard">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Feed
            </Link>
          </Button>
        </div>
        <PostCard post={post} isDetailPage={true} />
      </div>
    </div>
  );
};

export default PostDetailPage;
