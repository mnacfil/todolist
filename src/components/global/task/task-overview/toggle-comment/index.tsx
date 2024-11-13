import CommentForm from "@/components/form/comment";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import clsx from "clsx";
import { Paperclip } from "lucide-react";
import React, { useState } from "react";
import task from "../..";
import { Prisma } from "@prisma/client";

type Props = {
  task: Prisma.TaskCreateInput;
  userId: string;
};

const ToggleComment = ({ task, userId }: Props) => {
  const [isComment, setIsComment] = useState(false);
  return (
    <>
      {isComment ? (
        <CommentForm
          userId={userId}
          taskId={task?.id ?? ""}
          onCancel={() => setIsComment(false)}
        />
      ) : (
        <div className="flex items-center space-x-2 my-5">
          <Avatar className="w-7 h-7">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>MN</AvatarFallback>
          </Avatar>
          <div
            className="rounded-full flex-1 border border-gray-100 px-4 py-1 flex justify-between items-center cursor-pointer hover:bg-orange-50/50"
            onClick={() => setIsComment(true)}
          >
            <span className="text-sm">Comment</span>
            <Paperclip className="w-4 h-4 opacity-50" />
          </div>
        </div>
      )}
    </>
  );
};

export default ToggleComment;
