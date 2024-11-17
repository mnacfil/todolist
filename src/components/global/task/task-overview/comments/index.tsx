"use client";

import HideAndShow from "@/components/global/hide-and-show";
import MoreActions from "@/components/global/more-actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Smile } from "lucide-react";
import { CommentActions } from "../actions";
import { Prisma } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { getTaskCommentsOptions } from "@/lib/react-query/options";
import Comment from "./comment";

type Props = {
  taskId: string;
  userId: string;
};

const Comments = ({ taskId, userId }: Props) => {
  const { data, isPending } = useQuery(getTaskCommentsOptions(taskId));

  if (isPending) {
    return <div>Loading comments...</div>;
  }

  return (
    <>
      {data?.comments && data.comments.length > 0 && (
        <HideAndShow
          label="Comments"
          subLabel={data.comments.length.toString()}
        >
          <div className="flex flex-col overflow-y-auto">
            {data.comments.map((comment) => (
              <div key={comment.id}>
                <Comment taskId={taskId} userId={userId} comment={comment} />
              </div>
            ))}
          </div>
        </HideAndShow>
      )}
    </>
  );
};

export default Comments;
