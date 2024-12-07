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
import clsx from "clsx";
import { useSection } from "@/hooks/section";

type Props = {
  projectId: string;
  onCancel: () => void;
};

const SectionForm = ({ projectId, onCancel }: Props) => {
  const { create } = useSection(projectId ?? "");
  const form = useForm<z.infer<typeof SectionSchema>>({
    mode: "onSubmit",
    defaultValues: {
      name: "",
    },
    resolver: zodResolver(SectionSchema),
  });

  const onSubmit = (values: z.infer<typeof SectionSchema>) => {
    create.mutate({
      title: values.name,
      Project: {
        connect: {
          id: projectId,
        },
      },
    });
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
            type="submit"
            className={`bg-red-500/50 text-xs hover:bg-red-500 hover:text-white, ${clsx(
              {
                "bg-red-500": (form.getValues("name") ?? "").length > 0,
              }
            )}`}
            size={"sm"}
            disabled={form.getValues("name").length === 0}
            aria-disabled={form.getValues("name").length === 0}
          >
            Add section
          </Button>
          <Button
            type="submit"
            className={`text-xs`}
            size={"sm"}
            variant="ghost"
            onClick={onCancel}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SectionForm;
