"use client";

import * as React from "react";
import { CalendarIcon } from "lucide-react";

import { cn, formatDueDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormControl } from "@/components/ui/form";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";

type Props = {
  value: Date | undefined;
  onChange: (...event: any[]) => void;
  onChangeCallback: (date: Date) => void;
};

const DatePicker = ({ value, onChange, onChangeCallback }: Props) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <Popover>
          <PopoverTrigger asChild>
            <FormControl>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[240px] pl-3 text-left font-normal",
                  !value && "text-muted-foreground"
                )}
              >
                {value ? formatDueDate(value) : <span>Pick a date</span>}
                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </FormControl>
          </PopoverTrigger>
          <PopoverContent
            align="start"
            className="flex w-auto flex-col space-y-2 p-2"
          >
            <Select
              onValueChange={(value) => {
                console.log(value);
                const selectedDate = new Date(
                  Date.now() + Number(value) * 24 * 60 * 60 * 1000
                );
                onChange(selectedDate);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select more here" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value="0">Today</SelectItem>
                <SelectItem value="1">Tomorrow</SelectItem>
                <SelectItem value="3">In 3 days</SelectItem>
                <SelectItem value="7">In a week</SelectItem>
              </SelectContent>
            </Select>
            <div className="rounded-md border">
              <Calendar
                mode="single"
                selected={value}
                onSelect={onChange}
                disabled={(date) =>
                  date < new Date(Date.now() - Date.now()) ||
                  date < new Date("1900-01-01")
                }
                initialFocus
              />
            </div>
          </PopoverContent>
        </Popover>
        <TooltipContent>Set due date</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default DatePicker;
