import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { SectionSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSection } from "@/hooks/section";
import { Section } from "@prisma/client";

type Props = {
  projectId: string;
  isEditing?: boolean;
  data?: Section;
  onCancel: () => void;
};

const SectionForm = ({ projectId, isEditing, data, onCancel }: Props) => {
  const { create, update } = useSection(projectId ?? "");
  const form = useForm<z.infer<typeof SectionSchema>>({
    mode: "onSubmit",
    defaultValues: {
      name: isEditing ? data?.title : "",
    },
    resolver: zodResolver(SectionSchema),
  });

  const onSubmit = (values: z.infer<typeof SectionSchema>) => {
    if (isEditing) {
      update.mutate({
        id: data?.id as string,
        name: values.name,
      });
      onCancel();
    } else {
      create.mutate({
        title: values.name,
        Project: {
          connect: {
            id: projectId,
          },
        },
      });
    }
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-2">
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  className="h-8"
                  placeholder="Name this section"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center gap-2">
          <Button
            type="button"
            size={"sm"}
            variant={"secondary"}
            className="text-sm"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className={`text-sm`}
            size={"sm"}
            variant="primary"
            disabled={
              form.getValues("name")?.length === 0 ||
              update.isPending ||
              create.isPending
            }
            aria-disabled={
              form.getValues("name")?.length === 0 ||
              update.isPending ||
              create.isPending
            }
          >
            Add section
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SectionForm;
