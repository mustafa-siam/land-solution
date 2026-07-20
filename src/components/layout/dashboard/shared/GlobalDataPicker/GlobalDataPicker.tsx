/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as React from "react";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { UseFormReturn, ControllerRenderProps } from "react-hook-form";

interface GlobalDataPickerProps<T extends Record<string, any>> {
  field: ControllerRenderProps<T, any>;
  metaData: Record<any, any>;
  setMetaData: React.Dispatch<React.SetStateAction<Record<string, any>>>;
  methods: UseFormReturn<T>;
  valueKey: keyof T;
}

export default function GlobalDataPicker<T extends Record<string, any>>({
  field,
  metaData,
  setMetaData,
  methods,
  valueKey,
}: GlobalDataPickerProps<T>) {
  const [date, setDate] = React.useState<Date | undefined>(
    metaData[valueKey] ? new Date(metaData[valueKey]) : undefined
  );

  React.useEffect(()=>{
    setDate(metaData?.[valueKey])
  },[metaData,valueKey])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={`w-full justify-start text-left font-normal ${
            !date ? "text-muted-foreground" : ""
          } ${
            methods.formState.errors[valueKey] ? "border-red-500 dark:border-red-500" : "border-gray-300"

          }`}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Select date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          captionLayout="dropdown"
          selected={date}
          onSelect={(selectedDate) => {
  if (!selectedDate) return;
  setDate(selectedDate);

  // Fix timezone issue — store date in local timezone
  const localDate = new Date(
    selectedDate.getTime() - selectedDate.getTimezoneOffset() * 60000
  )
    .toISOString()
    .split("T")[0];

  field.onChange(localDate);
  setMetaData({
    ...metaData,
    [valueKey]: localDate,
  });
}}

        />
      </PopoverContent>
    </Popover>
  );
}
