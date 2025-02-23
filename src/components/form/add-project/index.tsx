"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { AddProjectSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import { useProject } from "@/hooks/project";
import { useAuth } from "@clerk/nextjs";
import { ProjectWithRelation } from "@/components/layout/sidebar/my-projects/project-link";

type Props = {
  isEditing?: boolean;
  currentData?: ProjectWithRelation | null;
  onCancel: () => void;
};

const AddProjectForm = ({ currentData, isEditing, onCancel }: Props) => {
  const { userId } = useAuth();
  const nameRef = useRef<HTMLInputElement>(null);
  const { projectMutation } = useProject(userId as string);
  const form = useForm<z.infer<typeof AddProjectSchema>>({
    resolver: zodResolver(AddProjectSchema),
    mode: "onSubmit",
    defaultValues: {
      name: isEditing ? currentData?.title : "",
      color: isEditing ? "" : "",
    },
  });

  const onSubmit = (values: z.infer<typeof AddProjectSchema>) => {
    try {
      if (isEditing) {
        projectMutation.update.mutate({
          projectId: currentData?.id ?? "",
          title: values.name,
        });
      } else {
        projectMutation.create.mutate({
          userId: userId as string,
          data: {
            title: values.name,
            author: {
              connect: {
                clerkId: userId as string,
              },
            },
          },
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      form.reset();
      onCancel();
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <div className="flex flex-col gap-1">
                <FormControl>
                  <Input
                    placeholder="Project name..."
                    {...field}
                    ref={nameRef}
                  />
                </FormControl>
                <p className="text-xs text-muted-foreground w-full text-right">
                  0/100
                </p>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="color"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Color</FormLabel>
              <Select>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select theme for your project" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Charcoal">Charcoal</SelectItem>
                  <SelectItem value="Lime Green">Lime Green</SelectItem>
                  <SelectItem value="Teal">Teal</SelectItem>
                  <SelectItem value="Taupe">Taupe</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center gap-2 justify-end ">
          <Button
            variant="secondary"
            type="button"
            onClick={onCancel}
            size={"sm"}
            className="text-sm"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            size={"sm"}
            variant={"primary"}
            className="text-sm px-6"
          >
            {isEditing ? "Save" : "Add"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AddProjectForm;
