
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const TimePicker = React.forwardRef(({ className, onChange, value, ...props }, ref) => {
  const [hour, minute, period] = value ? value.split(/:|\s/) : ["12", "00", "AM"];

  const handleTimeChange = (type, newValue) => {
    let newHour = hour;
    let newMinute = minute;
    let newPeriod = period;

    switch (type) {
      case "hour":
        newHour = newValue.padStart(2, "0");
        break;
      case "minute":
        newMinute = newValue.padStart(2, "0");
        break;
      case "period":
        newPeriod = newValue;
        break;
    }

    onChange(`${newHour}:${newMinute} ${newPeriod}`);
  };

  return (
    <div className={cn("flex gap-2 items-center", className)} ref={ref} {...props}>
      <Select value={hour} onValueChange={(value) => handleTimeChange("hour", value)}>
        <SelectTrigger className="w-[70px]">
          <SelectValue placeholder="Hour" />
        </SelectTrigger>
        <SelectContent>
          {Array.from({ length: 12 }, (_, i) => {
            const hourValue = (i + 1).toString().padStart(2, "0");
            return (
              <SelectItem key={hourValue} value={hourValue}>
                {hourValue}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
      <span>:</span>
      <Select value={minute} onValueChange={(value) => handleTimeChange("minute", value)}>
        <SelectTrigger className="w-[70px]">
          <SelectValue placeholder="Min" />
        </SelectTrigger>
        <SelectContent>
          {Array.from({ length: 60 }, (_, i) => {
            const minuteValue = i.toString().padStart(2, "0");
            return (
              <SelectItem key={minuteValue} value={minuteValue}>
                {minuteValue}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
      <Select value={period} onValueChange={(value) => handleTimeChange("period", value)}>
        <SelectTrigger className="w-[70px]">
          <SelectValue placeholder="AM/PM" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="AM">AM</SelectItem>
          <SelectItem value="PM">PM</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
});

TimePicker.displayName = "TimePicker";

export { TimePicker };
