"use client";

import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { Prisma, SubTask } from "@prisma/client";
import { usePathname } from "next/navigation";
import {
  CalendarIcon,
  Check,
  Clock,
  Ellipsis,
  FlagIcon,
  XIcon,
} from "lucide-react";
import clsx from "clsx";
import { toast } from "sonner";
import { useSubTask, useTask } from "@/hooks/task";
import { AddTaskFormSchema } from "./schema";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { priorities } from "@/components/constants";
import { Card } from "@/components/ui/card";
import { useProjectTask } from "@/hooks/project";
import { useSectionTask } from "@/hooks/section";

export enum TaskPlace {
  MAIN = "main",
  PROJECT = "project",
  SECTION = "section",
}

type Props = {
  userId: string;
  taskId?: string;
  isEditing?: boolean;
  projectId?: string;
  sectionId?: string;
  currentTask?: Prisma.TaskCreateInput | SubTask;
  onCancel?: () => void;
  type?: "main-task" | "sub-task";
  place?: TaskPlace;
};

type TaskPriority = "p1" | "p2" | "p3" | "p4";

const AddTaskForm = ({
  isEditing = false,
  userId,
  taskId,
  projectId,
  sectionId,
  currentTask,
  onCancel,
  type = "main-task",
  place = TaskPlace.MAIN,
}: Props) => {
  const [taskPriority, setTaskPriority] = useState<TaskPriority>("p4");
  const { isPending, isUpdating, mutate, updateMutate } = useTask();
  const { createProjectTaskMutation, updateProjectTaskMutation } =
    useProjectTask(projectId ?? "");
  const { createSectionTaskMutation, updateSectionTaskMutation } =
    useSectionTask(projectId ?? "", sectionId ?? "");
  const { subTaskMutation } = useSubTask(taskId ?? "");
  const form = useForm<z.infer<typeof AddTaskFormSchema>>({
    resolver: zodResolver(AddTaskFormSchema),
    defaultValues: {
      title: isEditing ? currentTask?.title : "",
      description: isEditing
        ? currentTask?.description
          ? currentTask.description
          : ""
        : "",
      priority: "",
    },
  });
  const onSubmit = async (values: z.infer<typeof AddTaskFormSchema>) => {
    try {
      if (type === "sub-task") {
        if (isEditing) {
          subTaskMutation.update.mutate({
            subTaskId: currentTask?.id as string,
            data: {
              ...values,
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
            },
          });
        } else {
          subTaskMutation.create.mutate({
            ...values,
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
      }
      if (type === "main-task") {
        if (isEditing) {
          if (currentTask?.id) {
            if (place === TaskPlace.MAIN) {
              updateMutate({
                id: currentTask?.id,
                data: { ...values, author: { connect: { clerkId: userId } } },
              });
            }
            if (place === TaskPlace.PROJECT && projectId) {
              updateProjectTaskMutation.mutate({
                id: currentTask?.id,
                data: {
                  ...values,
                  author: {
                    connect: { clerkId: userId },
                  },
                  Project: {
                    connect: { id: projectId },
                  },
                },
              });
            }
            if (place === TaskPlace.SECTION && sectionId) {
              updateSectionTaskMutation.mutate({
                data: {
                  ...values,
                  author: {
                    connect: { clerkId: userId },
                  },
                  Section: {
                    connect: {
                      id: sectionId ?? "",
                    },
                  },
                },
                id: currentTask?.id as string,
                sectionId: sectionId ?? "",
              });
            }
          }
        } else {
          if (place === TaskPlace.PROJECT && projectId) {
            createProjectTaskMutation.mutate({
              ...values,
              author: {
                connect: {
                  clerkId: userId,
                },
              },
              Project: {
                connect: {
                  id: projectId ?? "",
                },
              },
            });
          }
          if (place === TaskPlace.SECTION && sectionId && projectId) {
            createSectionTaskMutation.mutate({
              sectionId,
              data: {
                ...values,
                author: {
                  connect: {
                    clerkId: userId,
                  },
                },
                Section: {
                  connect: {
                    id: sectionId ?? "",
                  },
                },
              },
            });
          }
          if (place === TaskPlace.MAIN) {
            mutate({
              ...values,
              author: {
                connect: {
                  clerkId: userId,
                },
              },
            });
          }
        }
      }
    } catch (error) {
      console.log(error);
      toast("Error", {
        description: "Something went wrong. Please try again later.",
      });
    } finally {
      form.reset();
    }
  };

  return (
    <Card className="mt-5">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Task name"
                    {...field}
                    className="border-none outline-none ring-offset-transparent focus:outline-none focus:border-none focus-visible:ring-offset-0 focus-visible:ring-transparent focus-visible:ring-0 font-semibold placeholder:text-gray-400 py-0 text-gray-700 text-xs"
                  />
                </FormControl>
                <FormMessage className="px-3" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="Description"
                      {...field}
                      className="border-none outline-none ring-offset-transparent focus:outline-none focus:border-none focus-visible:ring-offset-0 focus-visible:ring-transparent focus-visible:ring-0 placeholder:text-gray-300 text-[14px] py-0 text-gray-700 font-light text-xs"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <div className="flex gap-2 items-center m-3">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Button
                    variant={"outline"}
                    className="bg-white text-gray-900 border border-gray-300"
                  >
                    <CalendarIcon className="w-3 h-3 mr-1 opacity-50" /> Due
                    date
                  </Button>
                </TooltipTrigger>
                <TooltipContent>More actions</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <TooltipProvider>
                    <Tooltip>
                      <Select onValueChange={field.onChange}>
                        <FormControl>
                          <TooltipTrigger asChild>
                            <SelectTrigger>
                              <SelectValue placeholder="Select priority" />
                            </SelectTrigger>
                          </TooltipTrigger>
                        </FormControl>
                        <TooltipContent>
                          <div className="flex items-center space-x-1">
                            <p>Set priority </p>
                            {priorities.map((priority, i, arr) => (
                              <span
                                key={priority.label}
                                className="p-1 bg-gray-100 rounded-sm"
                              >
                                {i < arr.length - 1
                                  ? `${priority.label}, `
                                  : `${priority.label}`}{" "}
                              </span>
                            ))}
                          </div>
                        </TooltipContent>
                        <SelectContent>
                          {priorities.map((priority) => (
                            <SelectItem
                              value={priority.value}
                              key={priority.label}
                            >
                              <div className="flex gap-1 items-center">
                                <FlagIcon
                                  color={priority.color}
                                  className="h-4 w-4 opacity-50"
                                />
                                {priority.value}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </Tooltip>
                  </TooltipProvider>
                </FormItem>
              )}
            />
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={"outline"}
                    className="bg-white text-gray-900 border border-gray-300"
                    size={"sm"}
                  >
                    <Clock className="w-4 h-4 opacity-50" /> Reminders
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  Add reminers{" "}
                  <span className="p-1 bg-gray-100 rounded-sm"> ! </span>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Button
                    variant={"outline"}
                    className="bg-white text-gray-900 border border-gray-300"
                    size={"sm"}
                  >
                    <Ellipsis className="w-3 h-3 opacity-50" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>More actions</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <Separator />

          <div className="flex justify-between items-center p-3">
            <p>Section</p>
            <div className="flex items-center gap-2">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant={"outline"}
                    className="bg-gray-100/55 text-black text-xs"
                    onClick={onCancel}
                    size={"sm"}
                  >
                    Cancel
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Discard changes?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This changes you&apos;ve made won&apos;t be saved.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="bg-gray-400">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction>Discard</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              <Button
                type="submit"
                className={`bg-red-500/50 text-xs hover:bg-red-500 hover:text-white, ${clsx(
                  {
                    "bg-red-500": form.getValues("title").length > 0,
                  }
                )}`}
                disabled={isPending || isUpdating}
                size={"sm"}
              >
                {isEditing ? "Save" : "Add Task"}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </Card>
  );
};

export default AddTaskForm;
