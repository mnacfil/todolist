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

type Props = {};

const AddProjectForm = (props: Props) => {
  const nameRef = useRef<HTMLInputElement>(null);
  const form = useForm<z.infer<typeof AddProjectSchema>>({
    resolver: zodResolver(AddProjectSchema),
    mode: "onSubmit",
    defaultValues: {
      name: "",
      color: "",
    },
  });

  const onSubmit = (values: z.infer<typeof AddProjectSchema>) => {};

  console.log(nameRef.current);

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
          <Button value={"ghost"}>Cancel</Button>
          <Button type="submit">Add</Button>
        </div>
      </form>
    </Form>
  );
};

export default AddProjectForm;
