import React from "react";
import client from "@/api/client";
import PostDetailClient from "./PostDetailClient";

async function getPostData(postId) {
  try {
    const { data, error } = await client
      .rpc('get_posts', {
        p_user_id: null,
        p_sort_by: 'latest',
        p_mood: null,
      })
      .eq('post_id', postId)
      .single();

    if (error) throw error;

    if (data) {
      // Adaptasi struktur data agar sesuai dengan yang diharapkan PostCard
      return { ...data, comments: [{ count: data.comment_count }] };
    }
    return null;
  } catch (err) {
    console.error("Failed to fetch post:", err.message);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const post = await getPostData(params.post_id);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  const siteName = "EmoBoard";
  const title = `${post.title} | ${siteName}`;
  const description = post.content.substring(0, 155) + (post.content.length > 155 ? "..." : "");
  const imageUrl = post.is_anonymous ? `${process.env.NEXT_PUBLIC_SITE_URL}/logo.png` : post.profile.avatar_url;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/post/${post.post_id}`,
      siteName,
      images: [{ url: imageUrl }],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  };
}

const PostDetailPage = async ({ params }) => {
  const post = await getPostData(params.post_id);

  return (
    <div className="flex min-h-screen flex-col items-center p-4 sm:p-8 md:p-12">
      <PostDetailClient post={post} />
    </div>
  );
};

export default PostDetailPage;
