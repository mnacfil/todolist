import HideAndShow from "@/components/global/hide-and-show";
import MoreActions from "@/components/global/more-actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Smile } from "lucide-react";
import React from "react";
import task from "../..";
import { CommentActions } from "../actions";
import { Prisma } from "@prisma/client";

type Props = {
  task: Prisma.TaskCreateInput;
  comments: Prisma.CommentCreateInput[];
};

const Comments = ({ task, comments }: Props) => {
  return (
    <>
      {(task?.comments as Prisma.CommentCreateInput[]).length > 0 && (
        <HideAndShow label="Comments" subLabel={comments?.length.toString()}>
          <div className="flex flex-col overflow-y-auto">
            {comments.map((comment: any) => (
              <div key={comment.id} className="flex gap-4 py-2">
                <Avatar className="w-7 h-7 mt-2">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>MN</AvatarFallback>
                </Avatar>
                <div className="flex flex-col w-full">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <p className="font-semibold text-xs">Name</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(comment.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="p-1 rounded-sm hover:bg-gray-100 transition-all cursor-pointer">
                        <Smile size={18} className="" />
                      </div>
                      <MoreActions>
                        <CommentActions />
                      </MoreActions>
                    </div>
                  </div>
                  <p className="text-xs">{comment.content}</p>
                </div>
              </div>
            ))}
          </div>
        </HideAndShow>
      )}
    </>
  );
};

export default Comments;
