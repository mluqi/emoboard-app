import React, { useState } from "react";
import CreateComment from "./CreateComment";
import CommentList from "./CommentList";
import { CardContent, CardFooter } from "@/components/ui/card";

const CommentSection = ({ postId }) => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleCommentAdded = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <div className="bg-muted/50 border-t">
      <CardContent className="pt-4">
        <CommentList postId={postId} refreshTrigger={refreshTrigger} />
      </CardContent>
      <CardFooter>
        <CreateComment postId={postId} onCommentAdded={handleCommentAdded} />
      </CardFooter>
    </div>
  );
};

export default CommentSection;
