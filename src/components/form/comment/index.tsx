"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CommentSchema } from "./schema";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useComment } from "@/hooks/comment/useComment";
import { Comment } from "@prisma/client";
import Icon from "@/components/icons/icon";
import clsx from "clsx";

type Props = {
  onCancel: () => void;
  userId: string;
  taskId: string;
  isEditing?: boolean;
  currentComment?: Comment;
};

const CommentForm = ({
  onCancel,
  userId,
  taskId,
  isEditing = false,
  currentComment,
}: Props) => {
  const form = useForm<z.infer<typeof CommentSchema>>({
    mode: "onSubmit",
    defaultValues: {
      message: isEditing ? currentComment?.content : "",
    },
  });

  const { commentMutation } = useComment(taskId);

  const onSubmit = (values: z.infer<typeof CommentSchema>) => {
    if (isEditing) {
      commentMutation.update.mutate({
        commentId: currentComment?.id as string,
        data: {
          content: values.message,
          author: {
            connect: { clerkId: userId },
          },
          task: {
            connect: { id: taskId },
          },
        },
      });
    } else {
      commentMutation.create.mutate({
        content: values.message,
        author: {
          connect: {
            clerkId: userId,
          },
        },
        task: {
          connect: {
            id: taskId,
          },
        },
      });
    }
    form.reset();
  };

  const isDisabled =
    form.getValues("message").length === 0 || commentMutation.create.isPending;

  return (
    <Card className="p-4 mt-5 w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="h-auto w-full">
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Comment"
                    className="border-none outline-none focus-visible:outline-none focus-visible:ring-transparent p-0"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Icon icon="Clip" />
              <Icon icon="Mic" />
              <Icon icon="EmojiSmile" />
              <Icon icon="Puzzle" />
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                type="button"
                onClick={onCancel}
                size={"sm"}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isDisabled}
                variant={"primary"}
                size={"sm"}
                className={clsx(
                  "text-sm",
                  isDisabled ? "cursor-not-allowed" : "cursor-pointer"
                )}
                aria-disabled={isDisabled}
              >
                Comment
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </Card>
  );
};

export default CommentForm;
