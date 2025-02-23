import MoreActions from "@/components/global/more-actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Smile } from "lucide-react";
import { CommentActions } from "../actions";
import { Comment as CommentType } from "@prisma/client";
import { useState } from "react";
import CommentForm from "@/components/form/comment";
import { useComment } from "@/hooks/comment/useComment";
import clsx from "clsx";
import ProfileAvatar from "@/components/global/avatar";
import { formatDate } from "@/lib/utils";

type Props = {
  taskId: string;
  user: {
    userId: string;
    fullName: string;
    hasImage: boolean;
    imageUrl: string;
  };
  comment: CommentType;
};

const Comment = ({ comment, taskId, user }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const { commentMutation } = useComment(taskId);
  return (
    <>
      {isEditing ? (
        <div>
          <CommentForm
            onCancel={() => setIsEditing(false)}
            taskId={taskId}
            userId={user.userId}
            isEditing={isEditing}
            currentComment={comment}
          />
        </div>
      ) : (
        <div
          className="flex gap-4 py-2"
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          <ProfileAvatar />
          <div className="flex flex-col w-full">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <p className="font-semibold text-sm text-slate-700">
                  {user.fullName ?? "Guest user"}
                </p>
                <p className="text-xs text-muted-foreground">
                  {formatDate(new Date(comment?.createdAt))}
                </p>
              </div>
              <div
                className={clsx(
                  "flex items-center gap-1 transition-all duration-300",
                  isHover ? "opacity-100" : "opacity-0"
                )}
              >
                <div className="p-1 rounded-sm hover:bg-gray-100 transition-all cursor-pointer">
                  <Smile size={18} className="" />
                </div>
                <MoreActions>
                  <CommentActions
                    onEdit={() => setIsEditing(true)}
                    onDelete={() => {
                      commentMutation.delete.mutate(comment.id);
                    }}
                  />
                </MoreActions>
              </div>
            </div>
            <p className="text-sm font-light">{comment.content}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Comment;
