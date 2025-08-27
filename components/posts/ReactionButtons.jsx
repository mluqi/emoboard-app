import React, { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Smile, Angry, Frown, HelpCircle, Meh } from "lucide-react";
import client from "@/api/client";
import useAuth from "@/hooks/useAuth";
import { toast } from "sonner";

const reactionTypes = [
  { type: "happy", Icon: Smile, color: "text-green-500" },
  { type: "sad", Icon: Frown, color: "text-blue-500" },
  { type: "angry", Icon: Angry, color: "text-red-500" },
  { type: "confused", Icon: HelpCircle, color: "text-yellow-500" },
  { type: "flat", Icon: Meh, color: "text-gray-500" },
];

const ReactionButtons = ({ postId }) => {
  const { user } = useAuth();
  const [reactionCounts, setReactionCounts] = useState({});
  const [userReaction, setUserReaction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchReactions = useCallback(async () => {
    try {
      const { data, error } = await client.rpc("get_post_reactions", {
        p_post_id: postId,
        p_user_id: user ? user.id : null,
      });

      if (error) throw error;
      setReactionCounts(data.counts || {});
      setUserReaction(data.user_reaction);
    } catch (error) {
      toast.error("Failed to load reactions: " + error.message);
    } finally {
      setLoading(false);
    }
  }, [postId, user]);

  useEffect(() => {
    setLoading(true);
    fetchReactions();
  }, [fetchReactions]);

  const handleReaction = async (reactionType) => {
    if (!user) return toast.error("You must be logged in to react.");
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      const { error } = await client.rpc("toggle_reaction", {
        p_post_id: postId,
        p_user_id: user.id,
        p_reaction_type: reactionType,
      });
      if (error) throw error;
      // Refetch reactions to update state
      await fetchReactions();
    } catch (error) {
      toast.error("Failed to update reaction: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <div className="h-8 w-full animate-pulse bg-muted rounded-md" />;
  }

  return (
    <div className="flex items-center gap-1 flex-wrap">
      {reactionTypes.map(({ type, Icon, color }) => {
        const count = reactionCounts[type] || 0;
        const isSelected = userReaction === type;
        return (
          <Button
            key={type}
            variant="ghost"
            size="sm"
            onClick={() => handleReaction(type)}
            disabled={isSubmitting}
            className={`flex items-center gap-1.5 ${isSelected ? color : ""}`}
          >
            <Icon className={`h-4 w-4 ${isSelected ? "stroke-current" : ""}`} />
            {count > 0 && <span className="text-xs font-medium">{count}</span>}
          </Button>
        );
      })}
    </div>
  );
};

export default ReactionButtons;
