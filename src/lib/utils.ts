import { priorities } from "@/components/constants";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const months: Record<string, string> = {
  "0": "Jan",
  "1": "Feb",
  "2": "Mar",
  "3": "Apr",
  "4": "May",
  "5": "Jun",
  "6": "Jul",
  "7": "Aug",
  "8": "Sep",
  "9": "Oct",
  "10": "Nov",
  "11": "Dec",
};

// format "12/29/2024, 10:09:10 PM" to 29 Dec 10:09 PM
export const formatDate = (date: Date) => {
  const calendarDate = date.getDate();
  const month = months[date.getMonth().toString()];
  const minutes = date.getMinutes();
  const militaryHour = date.getHours();
  const hour = militaryHour > 12 ? militaryHour - 12 : militaryHour;
  const meridiem = militaryHour > 12 ? "PM" : "AM";

  return `${calendarDate} ${month} ${hour}:${
    minutes >= 10 ? minutes : `0${minutes}`
  } ${meridiem}`;
};

export const isStartsWithPriorityLabel = (title: string) => {
  const priorityLabels = priorities.map((priority) => priority.label);
  return priorityLabels.some((label) => title.startsWith(label));
};
