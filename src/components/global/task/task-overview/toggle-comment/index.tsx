import CommentForm from "@/components/form/comment";
import ProfileAvatar from "@/components/global/avatar";
import { Paperclip } from "lucide-react";
import React, { useState } from "react";

type Props = {
  taskId: string;
  userId: string;
};

const ToggleComment = ({ taskId, userId }: Props) => {
  const [isComment, setIsComment] = useState(false);
  return (
    <>
      {isComment ? (
        <CommentForm
          userId={userId}
          taskId={taskId}
          onCancel={() => setIsComment(false)}
        />
      ) : (
        <div className="flex items-center space-x-2 my-5">
          <ProfileAvatar />
          <div
            className="rounded-full flex-1 border border-gray-100 px-4 py-1 flex justify-between items-center cursor-pointer hover:bg-orange-50/50"
            onClick={() => setIsComment(true)}
          >
            <span className="text-sm text-muted-foreground font-light">
              Comment
            </span>
            <Paperclip className="w-4 h-4 opacity-50" />
          </div>
        </div>
      )}
    </>
  );
};

export default ToggleComment;
