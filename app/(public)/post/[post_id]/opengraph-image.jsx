import { ImageResponse } from "next/og";
import client from "@/api/client";

// Route segment config
export const runtime = "edge";

// Image metadata
export const alt = "Post on EmoBoard";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

async function getPostDataForOg(postId) {
  try {
    const { data, error } = await client
      .rpc("get_posts", {
        p_user_id: null,
        p_sort_by: "latest",
        p_mood: null,
        p_requesting_user_id: null,
        p_post_ids: [postId],
      })
      .single();
    if (error) throw error;
    return data;
  } catch (err) {
    console.error("Failed to fetch post for OG image:", err.message);
    return null;
  }
}

export default async function Image({ params }) {
  const {post_id} = await params;
  const post = await getPostDataForOg(post_id);

  if (!post) {
    return new Response("Post not found", { status: 404 });
  }

  return new ImageResponse(
    (
      <div
        style={{
          background: "#111827", // gray-900
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          padding: "60px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            height: "100%",
            border: "2px solid #374151", // gray-700
            borderRadius: "20px",
            padding: "40px",
            background: "#1F2937", // gray-800
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <h1
              style={{
                fontSize: "60px",
                fontWeight: 700,
                marginBottom: "20px",
              }}
            >
              {post.title}
            </h1>
            <p
              style={{
                fontSize: "32px",
                color: "#D1D5DB",
                whiteSpace: "pre-wrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {post.content.substring(0, 200) +
                (post.content.length > 200 ? "..." : "")}
            </p>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: "28px",
              color: "#9CA3AF",
            }}
          >
            {!post.is_anonymous && post.profile.avatar_url && (
              <img
                src={post.profile.avatar_url}
                alt={post.profile.username}
                width="60"
                height="60"
                style={{ borderRadius: "50%", marginRight: "20px" }}
              />
            )}
            <span>
              {post.is_anonymous ? "Anonymous" : `@${post.profile.username}`} on
              EmoBoard
            </span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
