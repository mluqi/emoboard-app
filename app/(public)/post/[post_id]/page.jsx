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
        p_requesting_user_id: null, // Tidak diperlukan untuk render di server
        p_post_ids: null,
      })
      .eq('post_id', postId)
      .single();

    if (error) throw error;

    return data;
  } catch (err) {
    console.error("Failed to fetch post:", err.message);
    return null;
  }
}

export async function generateMetadata({ params }) {
  if(!params.post_id){
    return {
      title: "Post Not Found",
    };
  }
  const post = await getPostData(params.post_id);

  const siteName = "EmoBoard";
  const title = `${post.title} | ${siteName}`;
  const description =
    post.content.substring(0, 155) + (post.content.length > 155 ? "..." : "");

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/post/${post.post_id}`,
      siteName,
      // 'images' akan diisi secara otomatis oleh opengraph-image.jsx
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
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
